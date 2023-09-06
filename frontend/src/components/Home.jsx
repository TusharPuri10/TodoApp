import "./styles/TodoPage.css";
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';

function Home() {
  return (
    <div>
      <div className="home-page">
        Making Task <br /> Management More <br /> Human!
      </div>
      <div className="home-page-footer">
        <div><TaskAltRoundedIcon color="secondary"/> <span>Add new tasks to your todo list.</span></div><br />
        <div><TaskAltRoundedIcon color="secondary"/> <span>Mark tasks as completed.</span></div><br />
        <div><TaskAltRoundedIcon color="secondary"/> <span>Remove completed tasks.</span></div><br />
        <div><TaskAltRoundedIcon color="secondary"/> <span>Clean and user-friendly interface.</span></div><br />
      </div>
    </div>
  );
}

export default Home;
