import React from "react";

import CardHeader from "@material-ui/core/CardHeader"; 
import List from "@material-ui/core/List"; 
import Card from "@material-ui/core/Card"; 
import ListItem from "@material-ui/core/ListItem"; 
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import OrganizationListItem from "./OrganizationListItem";

import styles from "../../assets/jss/ronday-material-dashboard/components/organizationListStyle";

const OrganizationList = ({ user, organizations }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <Card elevation={0} className={classes.card}>
      {user && (
        <CardHeader
          className={classes.cardHeader}
          title={`Organizations for ${user.emailAddress}`}
          titleTypographyProps={{ variant: "subtitle1", className: classes.cardHeader }}
        ></CardHeader>
      )}
      <List className={classes.list}>
        {organizations && organizations.length > 0 ? (
          organizations.map((o, i) => (
            <OrganizationListItem
              key={i}
              organization={o}
              spaces={o.spaces.length}
              members={o.members.length}
            />
          ))
        ) : (
          <ListItem className={classes.noOrganizationsListItem}>
            <Typography variant="body1" className={classes.noOrgTextBold}>
              You’re not a member of any organization.
            </Typography>
            <p className={classes.noOrgText}>
              If your team is already on Ronday, please ask your organization
              admin(s) to send you an invite. Otherwise, click the button below to{" "}
              <a
                target="blank"
                referrerPolicy="noopener noreferrer"
                href="https://forms.gle/2PfqTHoZ5HGXiShB7"
              >
                join the waitlist
              </a>{" "}
              to create your own organization on Ronday.
            </p>
          </ListItem>
        )}
      </List>
    </Card>
  );
};

export default OrganizationList;
