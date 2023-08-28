import { Pagination } from "@mui/material";

type Props = {
  count: number;
  itemsPerPage: number;
  onChange: (e: any, newPage: any) => void;
  page: number;
};

export default function PaginationService({
  count,
  itemsPerPage,
  onChange,
  page,
}: Props) {
  return (
    <div>
      <Pagination
        count={Math.ceil(count / itemsPerPage)}
        showFirstButton
        showLastButton
        variant="outlined"
        shape="circular"
        onChange={onChange}
        page={page}
      />
    </div>
  );
}
