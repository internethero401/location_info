import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase"; // Firestoreをインポート
import { setDoc, doc, getDoc } from "firebase/firestore"; // Firestoreのメソッドをインポート

function Location({ setFlag, loginEmail, setLoginEmail }) {
    // 学校にいるか
    const [where, setWhere] = useState("");

    // Firestoreから特定のドキュメントを取得
    useEffect(() => {
        const fetchWhere = async () => {
            try {
                const docRef = doc(db, "locations", "ugoku30@gmail.com"); // 固定のドキュメントを参照
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setWhere(docSnap.data().where);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };

        fetchWhere();
    }, []); // 空の依存配列なので、コンポーネントのマウント時に一度だけ実行されます

    // `ugoku30@gmail.com`でログインした場合のみ位置情報を更新
    useEffect(() => {
        if (loginEmail === 'ugoku30@gmail.com') {
            const collegeY = 34.70566092013364;
            const collegeX = 135.50006621108406;
            const houseY = 34.7045888;
            const houseX = 134.5841536;
            const distanceError = 0.002;

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const y = position.coords.latitude;
                        const x = position.coords.longitude;
                        console.log("(y, x):", y, x);
                        const isNearCollege = Math.abs(y - collegeY) < distanceError && Math.abs(x - collegeX) < distanceError;
                        const isNearHouse = Math.abs(y - houseY) < distanceError && Math.abs(x - houseX) < distanceError;

                        let location = "";
                        if (isNearCollege) {
                            location = "College";
                        } else if (isNearHouse) {
                            location = "House";
                        } else {
                            location = "Moving\n or\n Playing";
                        }
                        setWhere(location);

                        // Firestoreにデータを保存
                        try {
                            await setDoc(doc(db, "locations", "ugoku30@gmail.com"), {
                                where: location
                            });
                            console.log("位置情報が保存されました");
                        } catch (e) {
                            console.error("位置情報の保存に失敗しました: ", e);
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
        }
    }, [where, loginEmail]);

    const handleButton = async () => {
        try {
            await signOut(auth);
            setLoginEmail('');
            setFlag(true);
        } catch (error) {
            console.error("ログアウトに失敗しました", error);
        }
    };

    return (
        <div style={{ height: '844px', width: '390px' }}>
            <div style={{ height: '344px', width: '390px', paddingTop: '70px', fontSize: '80px', fontWeight: 'bold', textAlign: 'center' }}>
                <div style={{ textDecoration: 'underline' }}>KiYoYa's</div>
                <div style={{ textDecoration: 'underline' }}>Location</div>
            </div>
            <div style={{ height: '544px', width: '390px', fontSize: '60px', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px', whiteSpace: 'pre-line', lineHeight: '1' }}>{where}</div>
                <button onClick={handleButton} style={{ height: '90px', width: '300px', fontSize: '60px', fontWeight: 'bold', margin: '0px 45px 0px 45px' }}>Sign out</button>
            </div>
        </div>
    );
}

export default Location;