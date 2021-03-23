import { useParams } from "react-router-dom";
import { Descriptions } from "antd";
import { IRegion } from "../types";
import NoData from "./NoData";

const info = {
  address: "Адресс",
  fullname: "Имя",
  libraries: "Кол-во библиотек",
  libraries_computers: "Кол-во компьютеров",
  territory: "Территория",
  users: "Кол-во пользователей",
  visits: "Кол-во посетителей",
  visits_sites: "Кол-во посетителей сайта",
};

const Region = ({ regions }: { regions: Array<IRegion> }) => {
  const { regionId }: { regionId: string } = useParams();
  const regionInfo = regions.find((region) => region.order === +regionId);

  if (!regionInfo) {
    return <NoData />;
  }

  return (
    <Descriptions
      title="Статистическая информация"
      layout="horizontal"
      column={1}
    >
      {Object.entries(info).map(([infoKey, infoLabel]) => (
        <Descriptions.Item key={infoKey} label={infoLabel}>
          {regionInfo[infoKey]}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

export default Region;
