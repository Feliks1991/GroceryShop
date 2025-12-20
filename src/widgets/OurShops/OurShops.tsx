import { useState } from "react";
import Styles from "./OurShops.module.scss";

export const OurShops = () => {
  const [mapState, setMapState] = useState<number>(1);

  const mapLinks = [
    {
      id: 1,
      name: "п.Щельяюр",
      link: "https://yandex.by/map-widget/v1/?ll=27.669722%2C53.907095&mode=search&oid=243877976869&ol=biz&sctx=ZAAAAAgBEAAaKAoSCdmyfF2GQzxAER9LH7qgCktAEhIJldbfEoB%2Fvj8RhgK2gxH7pD8iBgABAgMEBSgKOABAtZ4GSAFqAnVhnQHNzMw9oAEAqAEAvQEShjkjwgE7sv%2BU8dYCjt7lq5kC7ZuOnsMG87%2FpmokHodCZzLkG9%2FbS71zr79Lx3gau7433%2FAbZ4fa69QHQr83m4AaCAgVncmVlbooCAJICAJoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=27.669722%2C53.907095&sspn=0.497717%2C0.236776&text=green&z=11.47",
    },
    {
      id: 2,
      name: "д.Вертеп",
      link: "https://yandex.by/map-widget/v1/?ll=27.669722%2C53.907095&mode=search&oid=135335281765&ol=biz&sctx=ZAAAAAgBEAAaKAoSCdmyfF2GQzxAER9LH7qgCktAEhIJldbfEoB%2Fvj8RhgK2gxH7pD8iBgABAgMEBSgKOABAtZ4GSAFqAnVhnQHNzMw9oAEAqAEAvQEShjkjwgE7sv%2BU8dYCjt7lq5kC7ZuOnsMG87%2FpmokHodCZzLkG9%2FbS71zr79Lx3gau7433%2FAbZ4fa69QHQr83m4AaCAgVncmVlbooCAJICAJoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=27.669722%2C53.907095&sspn=0.497717%2C0.236776&text=green&z=11.47",
    },
    {
      id: 3,
      name: "с.Краснобор",
      link: "https://yandex.by/map-widget/v1/?ll=27.669722%2C53.907095&mode=search&oid=242990342131&ol=biz&sctx=ZAAAAAgBEAAaKAoSCdmyfF2GQzxAER9LH7qgCktAEhIJldbfEoB%2Fvj8RhgK2gxH7pD8iBgABAgMEBSgKOABAtZ4GSAFqAnVhnQHNzMw9oAEAqAEAvQEShjkjwgE7sv%2BU8dYCjt7lq5kC7ZuOnsMG87%2FpmokHodCZzLkG9%2FbS71zr79Lx3gau7433%2FAbZ4fa69QHQr83m4AaCAgVncmVlbooCAJICAJoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=27.669722%2C53.907095&sspn=0.497717%2C0.236776&text=green&z=11.47",
    },
    {
      id: 4,
      name: "д.Диюр",
      link: "https://yandex.by/map-widget/v1/?ll=27.669722%2C53.907095&mode=search&oid=92042248114&ol=biz&sctx=ZAAAAAgBEAAaKAoSCdmyfF2GQzxAER9LH7qgCktAEhIJldbfEoB%2Fvj8RhgK2gxH7pD8iBgABAgMEBSgKOABAtZ4GSAFqAnVhnQHNzMw9oAEAqAEAvQEShjkjwgE7sv%2BU8dYCjt7lq5kC7ZuOnsMG87%2FpmokHodCZzLkG9%2FbS71zr79Lx3gau7433%2FAbZ4fa69QHQr83m4AaCAgVncmVlbooCAJICAJoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=27.669722%2C53.907095&sspn=0.497717%2C0.236776&text=green&z=11.47",
    },
  ];

  return (
    <>
      <div>
        {mapLinks.map((item) => {
          return (
            <button
              className={`${Styles.switchButton} ${mapState === item.id ? Styles.activ : " "}`}
              onClick={() => {
                setMapState(item.id);
              }}
              key={item.id}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      {mapLinks.map((item) => {
        if (item.id === mapState) {
          return <iframe src={item.link} className={Styles.map} key={item.id} />;
        }
      })}
    </>
  );
};
