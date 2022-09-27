import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useUsersContext } from "../App";
import UserEntity from "../entities/UserEntity";

interface GitUserProps {
  user: UserEntity;
  size: number;
  index: number;
}

const GitUser = (props: GitUserProps) => {
  const [users, setUsers] = useUsersContext();
  const ref = useRef<HTMLDivElement>(null);

  const [drag, dragRef] = useDrag(
    () => ({
      type: "USER",
      item: { ...props },
      collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
        };
      },
    }),
    [users]
  );

  // destructing position 1 of array.
  const { 1: dropRef } = useDrop(
    () => ({
      accept: "USER",
      hover(item: typeof props) {
        const dragIndex = item.index;
        const overIndex = props.index;
        if (dragIndex === overIndex) return;
        const [user] = users.splice(dragIndex, 1);
        users.splice(overIndex, 0, user);
        setUsers([...users]);
        item.index = overIndex;
      },
    }),
    [users]
  );

  dragRef(dropRef(ref));

  return (
    <div ref={ref} className={drag.isDragging ? "photo dragging" : "photo"}>
      <img
        style={{
          height: props.size,
        }}
        src={props.user.url}
      />
      <h1>{props.user.name}</h1>
    </div>
  );
};

export default GitUser;
