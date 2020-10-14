import React from "react";
//! Routing dependencies
import { Link } from "react-router-dom";

const subnav = [
    { name: "Dashboard", url: "/main" },
    { name: "Groups", url: "/main/groups" },
    { name: "Plans", url: "/main/plans" },
    { name: "Profile", url: "/main/profile" },
    { name: "Templates", url: "/main/templates" },
];

function About(props) {
    return (
        <div>
            <ul>
                {subnav.map(el => (
                    <li>
                        <Link
                            to={el.url}>
                            <span className="contentSubNav" key={el.name}>
                                {el.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>  
    );
};



export default About;