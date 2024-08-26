"use client";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useTheme } from "next-themes";
import {
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style"; // Import styles for consistency

type Props = {};

const AllCourses = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState<string | null>(null);
  const { theme } = useTheme(); // Get the current theme
  const { isLoading, data, error } = useGetAllCoursesQuery({});
  const [deleteCourse] = useDeleteCourseMutation(); // Add the delete mutation

  const handleDelete = async () => {
    if (courseId) {
      try {
        await deleteCourse(courseId).unwrap(); // Unwrap to handle success and error
        setOpen(false);
        // Optionally, you might want to refetch data here or handle state update
        // e.g., `refetch()` from `useGetAllCoursesQuery` if it provides refetching
      } catch (err) {
        // Handle the error if needed
        console.error("Failed to delete course", err);
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button>
          <FiEdit2 className="dark:text-white text-black" />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setOpen(true);
            setCourseId(params.row.id);
          }}
        >
          <AiOutlineDelete className="dark:text-white text-black" />
        </Button>
      ),
    },
  ];

  const rows: any = [];

  if (data && data.courses) {
    data.courses.forEach((item: any) => {
      rows.push({
        id: item._id,
        title: item.name,
        ratings: item.ratings,
        purchased: item.purchased,
        created_at: format(item.createdAt),
      });
    });
  }

  return (
    <div className="mt-[120px] -z-10">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4a9fc",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid rows={rows} columns={columns} checkboxSelection />
          </Box>
        </Box>
      )}

      {/* Confirmation Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-white dark:bg-gray-800 p-6 rounded shadow-md`}>
            <h1 className={`${styles.title}`}>
              Are you sure you want to delete this course?
            </h1>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setOpen(false)}
                className={`${styles.button}`}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className={`${styles.button} ml-2 !bg-[#f00000]`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCourses;
