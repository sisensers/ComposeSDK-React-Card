import React, { useState } from "react";
import { AreaChart, ExecuteQuery, QueryState, useExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "../sample-ecommerce";
import { measureFactory, Data, Cell, Filter, filterFactory } from "@sisense/sdk-data";
import { Card, CardContent, Typography, Grid, CircularProgress } from "@mui/material";
import { modifyChartStyle } from "./gradient-fill"; 
import CustomDropdown from "./CustomDropdown";

const predefinedDateRanges = [
  { label: "Last 30 Days", value: -30 },
  { label: "Last 90 Days", value: -90 },
  { label: "Last 180 Days", value: -180 },
];

const DialerCallsCard: React.FC = () => {
  const [dialerCalls, setDialerCalls] = useState<number>(0);
  const [conversationRate, setConversationRate] = useState<number>(0);
  const [positiveConversationRate, setPositiveConversationRate] = useState<number>(0);
  const [filterTeam, setFilterTeam] = useState<string | null>(null);
  const [filterDateRange, setFilterDateRange] = useState<number | null>(null); 

  const teamQueryProps = {
    dataSource: DM.DataSource,
    dimensions: [DM.Commerce.Condition],
    measures: [],
  };

  const { data: teamData } = useExecuteQuery(teamQueryProps);

  const teamOptions = teamData?.rows.map((row: any) => row[0].text) || [];

  const activeFilters: Filter[] = [
    filterTeam ? filterFactory.equals(DM.Commerce.Condition, filterTeam) : null,
    filterDateRange !== null ? filterFactory.dateRelative(DM.Commerce.Date.Months, filterDateRange, 0) : null,
  ].filter(Boolean) as Filter[];

  const formatNumber = (value: number): string => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "K";
    }
    return value.toString();
  };

  const formatPercentage = (value: number): string => {
    return value.toFixed(2);
  };

  return (
    <Card style={{ margin: "20px", padding: "20px" }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Dialer Calls 
        </Typography>

        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item>
            <CustomDropdown
              label="Team"
              value={filterTeam}
              options={teamOptions}
              onChange={setFilterTeam}
            />
          </Grid>
          <Grid item>
            <CustomDropdown
              label="Date Range"
              value={filterDateRange !== null ? filterDateRange.toString() : ""}
              options={predefinedDateRanges.map(range => range.label)}
              onChange={(label) => {
                const selectedRange = predefinedDateRanges.find(range => range.label === label);
                setFilterDateRange(selectedRange?.value || null);
              }}
            />
          </Grid>
        </Grid>

        {/* KPIs */}
        <Grid container spacing={2} style={{ marginTop: 16 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h2" fontWeight="bold">
              <ExecuteQuery
                dataSource={DM.DataSource}
                dimensions={[]}
                measures={[measureFactory.count(DM.Commerce.Revenue, "DialerCalls")]}
                filters={activeFilters}
              >
                {(queryState: QueryState) => {
                  if (queryState.isLoading) {
                    return <CircularProgress />;
                  }

                  if (queryState.error) {
                    return <div>Error: {queryState.error.message}</div>;
                  }

                  const data: Data = queryState.data;
                  const dynamicCount = data.rows.length > 0 ? (data.rows[0][0] as Cell).data : 0;
                  const formattedCount = formatNumber(Number(dynamicCount));
                  setDialerCalls(Number(dynamicCount));
                  return <>{formattedCount}</>;
                }}
              </ExecuteQuery>
            </Typography>
            <Typography variant="body1">Dialer calls</Typography>
          </Grid>

          <Grid item xs={6} md={4}>
            <Typography variant="h5">
              <ExecuteQuery
                dataSource={DM.DataSource}
                dimensions={[]}
                measures={[measureFactory.average(DM.Commerce.Revenue, "ConversationRate")]}
                filters={activeFilters}
              >
                {(queryState: QueryState) => {
                  if (queryState.isLoading) {
                    return <CircularProgress />;
                  }

                  if (queryState.error) {
                    return <div>Error: {queryState.error.message}</div>;
                  }

                  const data: Data = queryState.data;
                  const dynamicRate = data.rows.length > 0 ? (data.rows[0][0] as Cell).data : 0;
                  const formattedRate = formatPercentage(Number(dynamicRate));
                  setConversationRate(Number(dynamicRate));
                  return <>{formattedRate}%</>;
                }}
              </ExecuteQuery>
            </Typography>
            <Typography variant="body2">Conversation rate</Typography>
          </Grid>

          <Grid item xs={6} md={4}>
            <Typography variant="h5">
              <ExecuteQuery
                dataSource={DM.DataSource}
                dimensions={[]}
                measures={[measureFactory.average(DM.Commerce.Revenue, "PositiveConversationRate")]}
                filters={activeFilters}
              >
                {(queryState: QueryState) => {
                  if (queryState.isLoading) {
                    return <CircularProgress />;
                  }

                  if (queryState.error) {
                    return <div>Error: {queryState.error.message}</div>;
                  }

                  const data: Data = queryState.data;
                  const dynamicRate = data.rows.length > 0 ? (data.rows[0][0] as Cell).data : 0;
                  const formattedRate = formatPercentage(Number(dynamicRate));
                  setPositiveConversationRate(Number(dynamicRate));
                  return <>{formattedRate}%</>;
                }}
              </ExecuteQuery>
            </Typography>
            <Typography variant="body2">Positive conversation rate</Typography>
          </Grid>
        </Grid>

        <AreaChart
          dataSet={DM.DataSource}
          dataOptions={{
            category: [DM.Commerce.Date.Quarters],
            value: [
              measureFactory.average(DM.Commerce.Revenue, "Total Revenue"),
            ],
            breakBy: [],
          }}
          filters={activeFilters}
          styleOptions={{
            yAxis: { enabled: false, gridLines: false },
            xAxis: { enabled: false, gridLines: false },
            legend: { enabled: false },
            subtype: "area/spline",
          }}
          onBeforeRender={(options: any) => modifyChartStyle(options)}
        />
      </CardContent>
    </Card>
  );
};

export default DialerCallsCard;
