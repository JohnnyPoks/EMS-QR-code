import Navbar from "../components/navbar";

type Props = {
  id: number;
  name: string;
  telephone: string;
  status: string;
};

const Table = ({ props }: { props: Props[] }) => {
  const getTime = () => {
    const time = new Date();
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours} : ${minutes}`;
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">Noms</th>
          <th className="px-4 py-2">Heure d'arrivée</th>
          <th className="px-4 py-2">Heure de sortie</th>
          <th className="px-4 py-2">Statut</th>
        </tr>
      </thead>
      <tbody>
        {props.map((item) => (
          <tr key={item.id}>
            <td className="border px-4 py-2 text-center">{item.name}</td>
            <td className="border px-4 py-2 text-center">{getTime()}</td>
            <td className="border px-4 py-2 text-center">{getTime()}</td>
            <td
              className="border px-4 py-2 text-center"
              style={{ color: item.status === "present" ? "green" : "red" }}
            >
              {item.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Eventpage = () => {
  const data = [
    {
      id: 1,
      name: "John Doe",
      telephone: "123-456-7890",
      status: "present",
    },
    {
      id: 2,
      name: "Jane Doe",
      telephone: "987-654-3210",
      status: "absent",
    },
    {
      id: 3,
      name: "Bob Smith",
      telephone: "555-555-5555",
      status: "present",
    },
    {
      id: 4,
      name: "Alice Johnson",
      telephone: "111-222-3333",
      status: "absent",
    },
    {
      id: 5,
      name: "John Doe",
      telephone: "123-456-7890",
      status: "present",
    },
    {
      id: 6,
      name: "Jane Doe",
      telephone: "987-654-3210",
      status: "absent",
    },
    {
      id: 7,
      name: "Bob Smith",
      telephone: "555-555-5555",
      status: "present",
    },
    {
      id: 8,
      name: "Alice Johnson",
      telephone: "111-222-3333",
      status: "absent",
    },
    {
      id: 9,
      name: "John Doe",
      telephone: "123-456-7890",
      status: "present",
    },
    {
      id: 10,
      name: "Jane Doe",
      telephone: "987-654-3210",
      status: "absent",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Navbar />
      <div className="flex items-center justify-around w-full m-5 max-md:flex-col">
        <p className="font-bold">Statistiques de l'événement</p>
        <div className="flex items-center justify-around max-md:mt-5">
          <p className="p-3 mx-3 bg-indigo-200 font-extrabold rounded-full">
            {data.length} Invités
          </p>
          <p className="p-3 mx-3 bg-green-200 font-extrabold rounded-full">
            {data.filter((item) => item.status === "present").length} Présents
          </p>
          <p className="p-3 mx-3 bg-red-200 font-extrabold rounded-full">
            {data.filter((item) => item.status === "absent").length} Absents
          </p>
        </div>
      </div>
      <Table props={data} />
    </div>
  );
};

export default Eventpage;
