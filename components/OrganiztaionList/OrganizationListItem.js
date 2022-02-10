import React from "react";
import Router from "next/router";
import Image from "next/image";

import clsx from "clsx";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

import ConditionalLink from "../ConditionalLink/ConditionalLink";
import useWindowSize from "../../@ronday/hooks/useWindowSize";
import { setSelectedOrganizationId } from "../store/authSlice";
import styles from "../../assets/jss/ronday-material-dashboard/components/organizationListStyle";

const OrganizationListItem = ({ organization, members, spaces }) => {
  const [width, _] = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { displayName, logoUrl, isAdmin, organizationId } = organization;

  const handleManageOrganization = (e) => {
    e.preventDefault();
    dispatch(setSelectedOrganizationId(organizationId));
    Router.push("/dashboard/spaces");
  };

  const plural = (val) => {
    return val > 1 ? "s" : "";
  };

  return (
    <ListItem className={classes.listItem}>
        <Card
          className={clsx(classes.imageCard, logoUrl ? "" : classes.emptyCard)}
        >
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={`${displayName} Logo`}
              width={48}
              height={48}
            />
          )}
        </Card>
        <div>
          <p className={classes.orgName}>{displayName}</p>
          <p className={classes.orgInfo}>
            {members} member{plural(members)} • {spaces} space{plural(spaces)}{" "}
          </p>
        </div>
        {isAdmin ? (
          <Button
            onClick={(e)=>{
              e.stopPropagation();
              handleManageOrganization(e)
            }}
            variant="contained"
            disableElevation={true}
            className={classes.button}
          >
            Manage
          </Button>
        ) : null}
    </ListItem>
  );
};

export default OrganizationListItem;
