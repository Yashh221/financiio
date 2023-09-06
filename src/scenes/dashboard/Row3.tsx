import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            { value: value, name: key },
            { name: `${key} of Total`, value: totalExpenses - value },
          ];
        }
      );
    }
  }, [kpiData]);
  const productColumns = [
    {
      field: "_id",
      headerName: "id ",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense ",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price ",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];
  const transactionColumn = [
    {
      field: "_id",
      headerName: "id ",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount ",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count ",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];
  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} Latest Products`}
        />
        <Box
          mx="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeperator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox bgcolor="#fff" gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} Latest Transactions`}
        />
        <Box
          mx="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeperator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumn}
          />
        </Box>
      </DashboardBox>
      <DashboardBox bgcolor="#fff" gridArea="i">
        <BoxHeader title="Expense Breakdown by Category" sideText="+7%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem">
          {
            pieChartData?.map((data) => (
              <Box key={data[0].name}>
                <PieChart width={100} height={80}>
                  <Pie
                    stroke="none"
                    data={data}
                    innerRadius={15}
                    outerRadius={30}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
                <Typography variant="h5" textAlign="center">
                  {data[0].name}
                </Typography>
              </Box>
            ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox bgcolor="#fff" gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+9%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
          sapiente praesentium ipsum officiis fuga fugiat, debitis, modi dolor
          quae laboriosam dolores eveniet ducimus quidem animi architecto
          voluptates aliquam. Maxime, unde!
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
