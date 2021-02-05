import React from "react";

const GroupList = () => {
    const groups = [
        {
            name: "Meadows Edge",
            participants: [
                {
                    name: "one",
                    age: 11,
                },
            ],
            animators: [
                {
                    name: "Kent",
                    conversations: [],
                },
            ],
        },
    ];

    return (
        <div>
            <h2>Group List</h2>
            {groups.map((group, i) => (
                <div key={i}>{group.name}</div>
            ))}
        </div>
    );
};

export default GroupList;
