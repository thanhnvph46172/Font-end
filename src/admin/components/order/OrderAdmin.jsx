import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function createData(name, calories, fat, carbs, status) {
  return { name, calories, fat, carbs, status };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, "pending"),
  createData("Ice cream sandwich", 237, 9.0, 37, "complete"),
  createData("Eclair", 262, 16.0, 24, "order_placed"),
  createData("Cupcake", 305, 3.7, 67, "delivered"),
  createData("Gingerbread", 356, 16.0, 0, "pending"),
];

export default function OrderAdmin() {
  const handleChange = (event, id) => {
    console.log("handle change", event, id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">User Details</TableCell>
            <TableCell align="right">Transactipon Id</TableCell>
            <TableCell align="right">Payment Status</TableCell>
            <TableCell align="right">Order Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">
                {" "}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={row.status}
                    label="Age"
                    onChange={(e) => handleChange(e, i)}
                  >
                    <MenuItem value={"pending"}>Pending</MenuItem>
                    <MenuItem value={"order_placed"}>Order Placed</MenuItem>
                    <MenuItem value={"delivered"}>Delivered</MenuItem>
                    <MenuItem value={"complete"}>Complete</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
