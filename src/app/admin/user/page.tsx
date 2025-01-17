"use client";
// "use server";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import {
  Table,
  Modal,
  Label,
  TextInput,
  Select,
  Dropdown,
} from "flowbite-react";

import { DataUser } from "./types";

import { db } from "@/app/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

import Swal from "sweetalert2";
import Image from "next/image";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function Page() {
  // creating Database Reference
  const dbref = collection(db, "users");

  //kode modal Add
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);

  const openModalAdd = () => setIsOpenAdd(true);
  const closeModalAdd = () => {
    setName("");
    setEmail("");
    setPass("");
    setRole("");
    setImg(null);
    setIsOpenAdd(false);
  };

  //kode modal Delete
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any | null>(null);

  const openModalDelete = (id: any) => {
    setDeleteId(id);
    setIsOpenDelete(true);
  };
  const closeModalDelete = () => {
    setDeleteId(null);
    setIsOpenDelete(false);
  };

  // handling user input
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);

  // kode upload file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setImg(selectedFile);
  };

  // Handling AddUser Function
  const addUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Mencegah refresh halaman

    let image: string = img ? img.name : "";
    try {
      await addDoc(dbref, {
        email: email,
        fullName: name,
        image: image,
        // image: img,
        password: pass,
        role: role,
      });

      Swal.fire({
        title: "Berhasi Ditambahkan!",
        icon: "success",
        draggable: true,
      });
      closeModalAdd();
    } catch (error) {
      Swal.fire({
        title: "Gagal Ditambahkan!",
        icon: "error",
        draggable: true,
      });
    }
  };

  //Create Fetch
  // create fetch and setFetch
  const [fetchData, setFetchData] = useState([]);
  // Definisikan fetchdata dengan useCallback
  const fetchdata = useCallback(async () => {
    try {
      const getData = await getDocs(dbref);
      const snap: any = getData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFetchData(snap);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [dbref]);

  useEffect(() => {
    fetchdata();
  }, [fetchdata]);

  const deleteUser = async () => {
    const delref = doc(dbref, deleteId);
    const delDoc = await deleteDoc(delref);

    Swal.fire({
      title: "Berhasi Dihapus!",
      icon: "success",
      draggable: true,
    });

    fetchdata();
    closeModalDelete();
  };

  // password sensor=============
  const maskPassword = (password: any | null) => {
    if (!password) return "********";
    return password.replace(/./g, "*"); // Sensor password dengan '*'
  };

  return (
    <>
      <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray pt-6  relative w-full break-words">
        <div className="card-header border-b-2 w-full p-5 ">
          <h5 className="card-title ms-2">User</h5>
        </div>
        <div className="p-6">
          <div className="mt-2">
            <button
              onClick={openModalAdd}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-full flex justify-center items-center"
            >
              <Icon
                icon="solar:add-folder-broken"
                color="white"
                height={25}
                className="mr-2"
              />
              Tambah User
            </button>

            <Modal show={isOpenAdd} size="xl" onClose={closeModalAdd}>
              <Modal.Header>Tambah User</Modal.Header>
              <form onSubmit={addUser} encType="multipart/form-data">
                <Modal.Body>
                  <div className="flex  flex-col gap-4">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="name" value="Nama Lengkap" />
                      </div>
                      <TextInput
                        id="name"
                        type="text"
                        placeholder="Masukkan Nama Lengkap"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-control"
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="email1" value="Email" />
                      </div>
                      <TextInput
                        id="email1"
                        type="email"
                        placeholder="Masukkan Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control"
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="password1" value="Password" />
                      </div>
                      <TextInput
                        id="password1"
                        type="password"
                        placeholder="Masukkan Password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                        className="form-control"
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="name" value="Role" />
                      </div>
                      <Select
                        onChange={(e) => setRole(e.target.value)}
                        id="role"
                        required
                        value={role || ""} // Memastikan value sesuai dengan state
                        className="select-rounded"
                      >
                        <option value="">Pilih Role</option>{" "}
                        <option value="Admin">Admin</option>
                        <option value="Karyawan">Karyawan</option>
                      </Select>
                    </div>

                    <Label htmlFor="fileUpload" value="Pilih Foto" />
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="fileUpload"
                        className="cursor-pointer w-full bg-gray-100 text-gray-700 border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-200"
                      >
                        {!img ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="w-6 h-6 mr-3 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.243 7.757a1 1 0 00-1.414 0L10 11.586 7.171 8.757a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l5-5a1 1 0 000-1.414z"
                                clipRule="evenodd"
                              />
                              <path
                                fillRule="evenodd"
                                d="M2 10a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>

                            <span className="text-sm">
                              Click or drag to upload a file
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Label>Selected File: {img.name}</Label>
                          </div>
                        )}
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="fileUpload"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-center items-center">
                  <button
                    type="button"
                    onClick={closeModalAdd}
                    className="px-6 py-2 text-white bg-red-500 rounded-md hover:bg-gray-300"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    // onClick={addUser}
                    className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-gray-300"
                  >
                    Simpan
                  </button>
                </Modal.Footer>
              </form>
            </Modal>
            <hr className="mt-4" />
            <div className="overflow-x-auto">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>No</Table.HeadCell>
                  <Table.HeadCell>Foto</Table.HeadCell>
                  <Table.HeadCell>Nama</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Password</Table.HeadCell>
                  <Table.HeadCell>Role</Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y divide-border dark:divide-darkborder ">
                  {fetchData.map((item: DataUser, index) => (
                    <Table.Row key={index}>
                      <Table.Cell className="whitespace-nowrap ps-6">
                        <div className="flex gap-3 items-center">
                          {index + 1}
                        </div>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap ps-6">
                        <div className="flex gap-3 items-center">
                          <Image
                            src={`/images/profile/${
                              item.image != "" ? item.image : "default.jpg"
                            }`}
                            // layout="fill"
                            width={80}
                            height={80}
                            alt="icon"
                            className="rounded-sm "
                          />
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{item.fullName}</h6>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{item.email}</h6>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">
                            {maskPassword(item.password)}
                          </h6>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{item.role}</h6>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          label=""
                          dismissOnClick={false}
                          renderTrigger={() => (
                            <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                              <HiOutlineDotsVertical size={22} />
                            </span>
                          )}
                        >
                          <Dropdown.Item key={index} className="flex gap-3">
                            {" "}
                            <Icon
                              icon="solar:pen-new-square-broken"
                              color="#6dd4f7"
                              height={18}
                            />
                            <span>Edit</span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            key={index}
                            className="flex gap-3"
                            onClick={() => openModalDelete(item.id)}
                          >
                            <Icon
                              icon="solar:trash-bin-minimalistic-outline"
                              color="#f7866d"
                              height={18}
                            />
                            <span>Hapus</span>
                          </Dropdown.Item>
                          <Dropdown.Item key={index} className="flex gap-3">
                            {" "}
                            <Icon
                              icon="solar:restart-circle-broken"
                              color="#6df78d"
                              height={18}
                            />
                            <span>Reset</span>
                          </Dropdown.Item>
                        </Dropdown>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

              <Modal show={isOpenDelete} size="md" onClose={closeModalDelete}>
                <Modal.Header>Hapus User</Modal.Header>

                <Modal.Body>
                  <div className="flex justify-center items-center">
                    Anda yakin ingin hapus?
                  </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-center items-center">
                  <button
                    type="button"
                    onClick={closeModalDelete}
                    className="px-6 py-2 text-white bg-red-500 rounded-md hover:bg-gray-300"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={deleteUser}
                    className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-gray-300"
                  >
                    Ya
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
