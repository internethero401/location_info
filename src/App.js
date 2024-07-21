import { useState, useEffect } from "react";

function App() {
  // 学校にいるか
  const [where, setWhere] = useState("");
  // 何階にいるか
  const [numOfFloor, setNumOfFloor] = useState(0);

  useEffect(() => {
    const collegeY = 34.705497;
    const collegeX = 135.493693;
    const houseY = 34.7045888;
    const houseX = 134.5841536;
    // 経度,緯度の許される差分
    const distanceError = 0.0001;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const y = position.coords.latitude;
          const x = position.coords.longitude;
          console.log("(y, x):", y, x)
          const z = position.coords.altitude;
          const isNearCollege = Math.abs(y - collegeY) < distanceError && Math.abs(x - collegeX) < distanceError;
          const isNearHouse = Math.abs(y - houseY) < distanceError && Math.abs(x - houseX) < distanceError;

          if (isNearCollege){
            setWhere("College");
          } else if(isNearHouse){
            setWhere("House");
          } else {
            setWhere("Moving\n or\n Playing");
          }

          if (z !== null) {
            const floor = Math.floor(z / 3);
            setNumOfFloor(floor);
          } else {
            console.log("高度情報が利用できません");
          }
        },
        (error) => {
          console.error("位置情報の取得に失敗しました", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Geolocationはこのブラウザではサポートされていません");
    }
  }, []);

  return (
    <div style={{ height: '844px', width: '390px', border: '2px solid black' }}>
      <div style={{ height: '344px', width: '390px', paddingTop: '70px', fontSize: '80px', fontWeight: 'bold', textAlign: 'center' }}>
        <div style={{ textDecoration: 'underline' }}>KiYoYa's</div>
        <div style={{ textDecoration: 'underline' }}>Location</div>
      </div>
      <div style={{ height: '544px', width: '390px', fontSize: '60px', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', whiteSpace: 'pre-line', lineHeight: '1' }}>{where}</div>
        <div style={{ borderBottom: '3px solid red', marginBottom: '20px' }}>{where === "college" ? numOfFloor : ""}</div>
      </div>
    </div>
  );
}

export default App;