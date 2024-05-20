// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from "react";
import { Typography } from "@mui/material";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import useAuth from "src/guards/authGuard/UseAuth";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Sample Page",
  },
];

const SamplePage = () => {
  const { user } = useAuth();

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      {/* breadcrumb */}
      <Breadcrumb title="Sample Page" items={BCrumb} />
      {/* end breadcrumb */}
      <DashboardCard title="Sample Page">
        {user && user.decodedToken.uid ? (
          <Typography>Hi {user.decodedToken.uid}</Typography>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;