import { useEffect, useState } from "react";
import {
  collection,
  where,
  query,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import styles from "./DeleteGroup.module.css";
import Navbar from "../Components/Navbar";
import SidebarAdmin from "../Components/SidebarAdmin";
import { useNavigate } from "react-router-dom";

function DeleteGroup() {
  const [groups, setGroups] = useState([]);
  const [adminData, setAdminData] = useState({});
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.email !== "admin@unimet.edu.ve") {
      navigate("/");
      return;
    }

    const getGroups = async () => {
      const q = query(
        collection(db, "Agrupaciones"),
        where("members", "==", [])
      );
      const querySnapshot = await getDocs(q);
      let groups = [];
      querySnapshot.forEach((doc) => {
        groups.push({ id: doc.id, ...doc.data() });
      });
      setGroups(groups);
    };

    const fetchAdminData = async () => {
      const adminCollection = collection(db, "Administrator");
      const adminSnapshot = await getDocs(adminCollection);
      if (!adminSnapshot.empty) {
        const admin = adminSnapshot.docs[0].data();
        setAdminData(admin);
      } else {
        console.log(
          "No se encontró ningún documento en la colección Administradores"
        );
      }
    };

    getGroups();
    fetchAdminData();
  }, [currentUser, history]);

  const deleteGroup = async (groupId) => {
    await deleteDoc(doc(db, "Agrupaciones", groupId));
    setGroups(groups.filter((group) => group.id !== groupId));
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.adminSection}>
        <SidebarAdmin />
        <div className={styles.profileInfo}>
          <img
            className={styles.profileImage}
            src={adminData.photoURL}
            alt="Profile"
          />
          <h2>{adminData.name}</h2>
          <p>{adminData.email}</p>
        </div>
      </div>
      <div className={styles.groupList}>
        <div className={styles.groupHeader}>
          <span>Agrupaciones</span>
          <span>Miembros</span>
          <span>Eliminar Agrupación</span>
        </div>
        {groups.map((group) => (
          <div key={group.id} className={styles.groupItem}>
            <span>{group.name}</span>
            <span>{group.members.length}</span>
            <button
              className={styles.deleteButton}
              onClick={() => deleteGroup(group.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeleteGroup;
