import React, { FC, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useTheme } from "next-themes";

import Loader from "../../Loader/Loader";
import CustomModal from "@/app/utils/CustomModal";
import AddMemberForm from "./AddMemberForm"; // Import AddMemberForm
import DeleteConfirmation from "./DeleteConfirmation"; // Import DeleteConfirmation

import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";

type Props = { isTeam?: boolean };

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser] = useDeleteUserMutation();

  const [active, setActive] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleDeleteUser = () => {
    if (selectedUserId) {
      deleteUser(selectedUserId).then(() => {
        refetch();
        setOpenDeleteModal(false);
      });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email-Address", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "createdAt", headerName: "Joined At", flex: 0.5 },

    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setSelectedUserId(params.row.id);
              setOpenDeleteModal(true);
            }}
          >
            <AiOutlineDelete className="dark:text-white text-black" />
          </Button>
        );
      },
    },

    {
      field: "mail",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <div>
            <a className="mt-2" href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="mt-4 dark:text-white text-black" />
            </a>
          </div>
        );
      },
    },
  ];

  const rows: any = [];
  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          createdAt: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          createdAt: format(item.createdAt),
        });
      });
  }

  console.log(data, "DATA");

  return (
    <div className="mt-[120px] -z-10">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !h-[35px] !w-[220px] dark:bg-[#57c7a3] dark:border dark:border-[#ffffff6c]`}
              onClick={() => setOpenAddModal(true)}
            >
              Add New Member
            </div>
          </div>
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

      {/* Add New Member Modal */}
      <CustomModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        component={AddMemberForm}
      />

      {/* Delete Confirmation Modal */}
      <CustomModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        component={() => (
          <DeleteConfirmation
            setOpen={setOpenDeleteModal}
            onDelete={handleDeleteUser}
          />
        )}
      />
    </div>
  );
};

export default AllUsers;
