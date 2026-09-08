import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useEffect } from "react";
import { getAllDeals } from "../../../State/admin/DealSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 600,
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },

  [theme.breakpoints.down("sm")]: {
    padding: "8px",
    fontSize: 12,

    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DealTable() {
  const dispatch = useAppDispatch();
  const { deal } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(getAllDeals());
  }, [dispatch]);

  return (
    <div className="w-full">
      <TableContainer
        component={Paper}
        className="w-full overflow-x-auto"
        sx={{
          borderRadius: { xs: 1, sm: 2 },
        }}
      >
        <Table
          aria-label="deals table"
          sx={{
            minWidth: {
              xs: 600,
              sm: 700,
            },
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>

              <StyledTableCell>Image</StyledTableCell>

              <StyledTableCell>Category</StyledTableCell>

              <StyledTableCell align="right">
                Discount
              </StyledTableCell>

              <StyledTableCell align="right">
                Update
              </StyledTableCell>

              <StyledTableCell align="right">
                Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {deal.deals.map((item, index) => (
              <StyledTableRow key={item.id}>

                {/* Number */}
                <StyledTableCell
                  component="th"
                  scope="row"
                >
                  {index + 1}
                </StyledTableCell>

                {/* Image */}
                <StyledTableCell>
                  <img
                    className="
                      w-12
                      h-12
                      sm:w-16
                      sm:h-16
                      md:w-20
                      md:h-20
                      object-cover
                      rounded-md
                    "
                    src={item.category.image}
                    alt={item.category.categoryId}
                  />
                </StyledTableCell>

                {/* Category */}
                <StyledTableCell>
                  <span className="whitespace-nowrap">
                    {item.category.categoryId}
                  </span>
                </StyledTableCell>

                {/* Discount */}
                <StyledTableCell align="right">
                  <span className="font-medium whitespace-nowrap">
                    {item.discount}%
                  </span>
                </StyledTableCell>

                {/* Edit */}
                <StyledTableCell align="right">
                  <IconButton
                    size="small"
                    aria-label="edit deal"
                  >
                    <Edit
                      fontSize="small"
                    />
                  </IconButton>
                </StyledTableCell>

                {/* Delete */}
                <StyledTableCell align="right">
                  <IconButton
                    size="small"
                    aria-label="delete deal"
                  >
                    <Delete
                      fontSize="small"
                      sx={{ color: "red" }}
                    />
                  </IconButton>
                </StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}