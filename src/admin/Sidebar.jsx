import {
  FiGrid,
  FiFolder,
  FiEdit3,
  FiAward,
  FiMail,
  FiUsers,
  FiTrendingUp,
  FiSettings,
  FiDownload,
  FiStar
} from "react-icons/fi";
const Sidebar = ({ active, setActive }) => {

  const menu = [
    { name: "Overview", icon: <FiGrid /> },
    { name: "Projects", icon: <FiFolder /> },
    { name: "Blog", icon: <FiEdit3 /> },
    { name: "Achievements", icon: <FiAward /> },
    { name: "Resume", icon: <FiDownload /> },        // ← Added
    { name: "Testimonials", icon: <FiStar /> },     // ← Added
    { name: "Messages", icon: <FiMail /> },
    { name: "Newsletter", icon: <FiUsers /> },
    { name: "Analytics", icon: <FiTrendingUp /> },
    { name: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div className="admin-sidebar">

      <h2>Telewarrbbies</h2>

      {menu.map((item) => (
        <button
          key={item.name}
          className={
            active === item.name
              ? "sidebar-link active"
              : "sidebar-link"
          }
          onClick={() => setActive(item.name)}
        >
          {item.icon}
          <span>{item.name}</span>
        </button>
      ))}

    </div>
  );
};

export default Sidebar;