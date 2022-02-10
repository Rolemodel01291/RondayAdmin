// import Card  from "@mui/material/Card";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../assets/jss/ronday-material-dashboard/components/organizationListSkeletonStyle";

const OrganizationListSkeleton = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={0}>
      <div className={classes.skeletonCardHeader}>
        <Skeleton height={27} width={"70%"} />
      </div>
      <div className={classes.skeletonList}>
        <Card elevation={0}>
          <Skeleton className={classes.skeletonOrganizationImage} />
          <div className={classes.orgInfoSkeleton}>
            <Skeleton height={30} width={"50%"} />
            <Skeleton height={21} width={"30%"} borderRadius={6} />
          </div>
        </Card>
        <Card elevation={0}>
          <Skeleton className={classes.skeletonOrganizationImage} />
          <div className={classes.orgInfoSkeleton}>
            <Skeleton height={30} width={"50%"} />
            <Skeleton height={21} width={"30%"} />
          </div>
        </Card>
      </div>
    </Card>
  );
};
export default OrganizationListSkeleton;
