from time import time
import networkx as nx

from .mastodon import MastodonClient


class ReplyAnalyzer:
    def __init__(self, account, status_url, instances=[]):
        self.account = account
        self.status_url = status_url
        self.mc = MastodonClient("aa@bb")
        self.instances = instances

        self.replies_by_instance_store = None
        self.edges = None

    def replies_by_instance(self):
        if self.replies_by_instance_store is None:
            self.replies_by_instance_store = {}

            for instance in self.instances:
                start_time = time()
                replies = self.descendant_urls_for_instance(instance)
                print(
                    f"Fetched {len(replies)} replies from {instance} in {time() - start_time} seconds"
                )

                if len(replies) > 0:
                    self.replies_by_instance_store[instance] = replies

        return self.replies_by_instance_store

    def instances_by_reply(self):
        replies = self.replies_by_instance()

        result = {}
        for instance, urls in replies.items():
            for url in urls:
                if url not in result:
                    result[url] = []

                result[url].append(instance)

        return result

    def instance_letters_by_reply(self):
        return {
            url: [self.instance_to_letter(instance) for instance in instances]
            for url, instances in self.instances_by_reply().items()
        }

    def instances_with_replies(self):
        return [i for i in self.instances if i in self.replies_by_instance_store]

    def instance_to_letter(self, instance):
        number = self.instances_with_replies().index(instance)
        return "ABCDEFGHIJKLMNOPQRSTUVWZYZ"[number]

    def create_reply_graph_edges(self):
        if not self.edges:
            instance = self.account.split("@")[2]
            status_id = self.status_id_on_instance(instance)
            descendants = self.mc.descendants_for_status_id(instance, status_id)

            descendant_info = [
                (d["id"], d["in_reply_to_id"], d["url"]) for d in descendants
            ]

            id_lookup = {d[0]: d[2] for d in descendant_info}
            id_lookup[status_id] = self.status_url

            self.edges = [
                (d[2], id_lookup[d[1]]) for d in descendant_info if d[1] in id_lookup
            ]

        return self.edges

    def get_relevant_status_id(self, data):
        dd = [x for x in data if x["url"] == self.status_url]

        if len(dd) != 1:
            return

        return dd[0]["id"]

    def status_id_on_instance(self, instance):
        account_id = self.mc.lookup_account_id(instance, self.account)
        resp = self.mc.account_statuses(instance, account_id)

        if resp is None:
            return None

        return self.get_relevant_status_id(resp)

    def descendant_urls_for_instance(self, instance):
        status_id = self.status_id_on_instance(instance)
        descendants = self.mc.descendants_for_status_id(instance, status_id)
        if descendants is None:
            descendants = []

        return [descendant["url"] for descendant in descendants]

    def build_conversation_visibility_graph(self):
        labels = {
            url: "".join(ii) for url, ii in self.instance_letters_by_reply().items()
        }
        color_pallette = [
            "#ca9bf7",
            "#ff964f",
            "#ffb7ce",
            "#d6fffe",
            "#c8ffb0",
            "#aaf0d1",
        ]
        color_lookup = {
            value: color_pallette[idx] for idx, value in enumerate(set(labels.values()))
        }
        G = nx.DiGraph()

        G.add_node(self.status_url)
        node_sizes = [10000]
        node_colors = ["blue"]

        for url, ii in self.instance_letters_by_reply().items():
            G.add_node(url, size=len(ii))
            node_sizes.append(len(ii) * 1000)
            node_colors.append(color_lookup["".join(ii)])

        G.add_edges_from(self.create_reply_graph_edges())

        return G, labels, node_sizes, node_colors
