import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GitUser from "./components/User";
import UserEntity from "./entities/UserEntity";
import fetchUsers from "./services/fetchUsers";

const UsersContext = createContext<
  [UserEntity[], React.Dispatch<React.SetStateAction<UserEntity[]>>] | null
>(null);

export const useUsersContext = () => useContext(UsersContext)!;

function App() {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [size, setSize] = useState(80);

  const onLoadUsers = () => {
    fetchUsers(setUsers);
  };

  useEffect(onLoadUsers, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <UsersContext.Provider value={[users, setUsers]}>
        <div className="App">
          <div className="group-control">
            <input
              type="range"
              value={size}
              onChange={({ target }) => {
                setSize(+target.value);
              }}
              min={60}
              max={100}
            />
            <button onClick={onLoadUsers}>Other People</button>
          </div>
          <div className="group-draggable">
            <div className="draggable">
              {users.map((user, i) => {
                return (
                  <GitUser key={user.name} size={size} user={user} index={i} />
                );
              })}
            </div>
          </div>
        </div>
      </UsersContext.Provider>
    </DndProvider>
  );
}

export default App;
