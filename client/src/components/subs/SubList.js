import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listSubs } from "../../functions/sub";

function SubList() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    listSubs().then((res) => {
      // console.log(res.data);
      setSubs(res.data);
      setLoading(false);
    });
  }, []);


  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          subs.map((s) => (
            <div key={s._id} className="col btn btn-light  btn-raised m-3">
              <Link to={`/sub/${s.slug}`} className="font-weight-bold text-uppercase text-dark">
                {s.name}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SubList;
