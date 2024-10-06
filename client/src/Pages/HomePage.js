import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export default function HomePage() {
  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      history.push("/chats");
    }
  }, [history]);
  return <div>HomePagsslfd s le</div>;
}
