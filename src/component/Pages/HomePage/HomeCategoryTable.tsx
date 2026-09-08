import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { HomeCategory } from "../../../types/HomeCategoryTypes";

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

export default function HomeCategoryTable({
  data,
}: {
  data: HomeCategory[];
}) {
  return (
    <div className="w-full">
      <TableContainer
        component={Paper}
        className="w-full overflow-x-auto"
        sx={{
          borderRadius: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        <Table
          aria-label="home category table"
          sx={{
            minWidth: {
              xs: 550,
              sm: 650,
              md: 700,
            },
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>
                No
              </StyledTableCell>

              <StyledTableCell>
                Id
              </StyledTableCell>

              <StyledTableCell>
                Image
              </StyledTableCell>

              <StyledTableCell align="right">
                Category
              </StyledTableCell>

              <StyledTableCell align="right">
                Update
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((category, index) => (
              <StyledTableRow
                key={category.id ?? category.categoryId}
              >
                {/* Number */}
                <StyledTableCell>
                  {index + 1}
                </StyledTableCell>

                {/* ID */}
                <StyledTableCell>
                  <span className="whitespace-nowrap">
                    {category.id}
                  </span>
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
                    src={category.image}
                    alt={
                      category.name ||
                      category.categoryId
                    }
                  />
                </StyledTableCell>

                {/* Category */}
                <StyledTableCell align="right">
                  <span className="whitespace-nowrap">
                    {category.categoryId}
                  </span>
                </StyledTableCell>

                {/* Update */}
                <StyledTableCell align="right">
                  <IconButton
                    size="small"
                    aria-label="edit category"
                  >
                    <Edit fontSize="small" />
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