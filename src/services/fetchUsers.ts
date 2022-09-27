import UserEntity from "../entities/UserEntity";

type ResponseType = {
  results: {
    name: {
      first: string;
    };
  }[];
};

const createObjectGitUser = (name: string) => ({
  name,
  url: `https://github.com/${name}.png`,
});

const fetchUsers = async (
  setState: React.Dispatch<React.SetStateAction<UserEntity[]>>
) => {
  const url = import.meta.env.VITE_API_USERS;
  const randomUsers: ResponseType = await fetch(url).then((response) =>
    response.json()
  );
  setState(
    randomUsers.results.map((result) =>
      createObjectGitUser(result.name.first.toLowerCase())
    )
  );
};

export default fetchUsers;
