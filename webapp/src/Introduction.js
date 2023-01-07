import {
  Button,
  Card,
  CardContent,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

const Introduction = ({ onNext }) => {
  return (
    <Paper elevation={5} sx={{ backgroundColor: "white", padding: 2 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
        Mastodon Instance Recommender
      </Typography>
      <div style={{ display: "flex" }}>
        <Card sx={{ backgroundColor: "lightblue", width: "40%", margin: 5 }}>
          <CardContent>
            <Typography variant="h6">
              Why does my Mastodon Instance matter?
            </Typography>
            <Typography paragraph>
              The content, you see, depends on two factors:
              <ol>
                <li>The people you follow</li>
                <li>
                  Your instance i.e. the people people on your instance follow
                </li>
              </ol>
              If you are only consuming your own timeline, 2. doesn&apos;t
              matter much. It only influences, which replies to a post, you see.
              <br />
              Features such as following a tag and the federated timeline very
              much depend on 2. as it is where they get their content from.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "#F7F6CF", width: "40%", margin: 5 }}>
          <CardContent>
            <Typography variant="h6">
              Let&apos;s do an example: #FungiFriday
            </Typography>
            <Typography paragraph>
              One of the features of Mastodon is one can subscribe to a tag,
              e.g. #FungiFriday. Now, what gets displayed? As you might have
              heard Mastodon is part of the Fediverse, and data is
              dezentraliced. There is no place to look up all posts with the tag
              #FungiFriday.
              <br />
              What Mastodon does instead is lookup the tag #FungiFriday in the
              data it has locally. This means the data acquired for the users on
              the instance, i.e. the posts of their followers and their own
              using the hashtag #FungiFriday.
            </Typography>
            <Typography paragraph>
              Don&apos;t believe me? Check out these two links. The first has 10
              times more content than the second.
              <br />
              <Link href="https://ecoevo.social/tags/FungiFriday">
                #FungiFriday on ecoevo.social
              </Link>
              <br />
              <Link href="https://bark.lgbt/tags/fungifriday">
                #FungiFriday on bark.lgbt
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div style={{ display: "flex" }}>
        <Card sx={{ backgroundColor: "#F4CFDF", width: "40%", margin: 5 }}>
          <CardContent>
            <Typography variant="h6">How are instances recommended?</Typography>
            <Typography paragraph>
              Instances are recommended based on which hashtags they are likely
              to federate more. So if you select #FungiFriday below, the
              instances recommended to you are more likely to feature pictures
              of mushrooms.
              <br />
              You can select multiple hashtags.
            </Typography>
            <Typography paragraph>
              The mathematical ideas behind this are a bit experimental and
              might change. Basically a score is assigned to each instance for
              each hashtag representing how much of all the posts with this
              hashtag, they federate. Then the difference of this value to its
              mean (over all hashtags, instance is fixed) represents the bias of
              this instance to federate posts with this hashtag.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: "#EEBAB2", width: "40%", margin: 5 }}>
          <CardContent>
            <Typography variant="h6">How do I proceed?</Typography>
            <Typography paragraph>
              Choose one or more hashtags in the list below. View instances in
              the field below the hashtag list. Select different instances on
              the left. Then explore their local timeline. If you like what you
              see, sign up. Make sure to checkout the instance&apos;s rules.
            </Typography>
            <Typography variant="h6">Final words</Typography>
            <Typography paragraph>
              If you have comments, you can reach me at my Fediverse handle
              @helgek@mas.to.
            </Typography>
            <Typography paragraph>
              I update the data from time to time. The current version was
              retrieved on 2023-01-07. The hashtags shown have been extracted by
              querying the trends endpoints of all instances involved.
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Button variant="contained" onClick={onNext} fullWidth>
        Next
      </Button>
    </Paper>
  );
};

export default Introduction;
