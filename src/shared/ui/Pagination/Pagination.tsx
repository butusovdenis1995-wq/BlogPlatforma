import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "@widgets/ListArticles/paginationSlice";
import { RootState } from "@/shared/config/store";

interface PaginationWrapperProps {
  articlesCount: number | undefined;
}

export default function PaginationWrapper({
  articlesCount,
}: PaginationWrapperProps) {
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );
  const dispatch = useDispatch();
  return (
    <Pagination
      defaultCurrent={currentPage}
      total={articlesCount}
      align="center"
      pageSize={5}
      onChange={(page) => dispatch(changePage(page))}
    />
  );
}
