import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_GROUP, ALL_GROUPS } from "../queries";

const AddGroup = () => {
    const [name, setName] = useState("");
    const [participantName, setParticipantName] = useState("");
    const [participantAge, setParticipantAge] = useState(0);
    const [participants, setParticipants] = useState([]);
    const [animator, setAnimator] = useState("");
    const [animators, setAnimators] = useState([]);

    const [addGroup] = useMutation(ADD_GROUP, {
        refetchQueries: [{ query: ALL_GROUPS }],
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        console.log("Adding group.");
        try {
            await addGroup({
                variables: {
                    name,
                    participants,
                    animators,
                },
            });
        } catch(e) {
            console.error(e);
        }

        setName("");
        setParticipantName("");
        setParticipantAge(0);
        setParticipants([]);
        setAnimator("");
        setAnimators([]);
    };

    const addAnimator = () => {
        setAnimators(animators.concat({
            name: animator,
            conversations: [],
        }));
        setAnimator("");
    };

    const addParticipant = () => {
        setParticipants(
            participants.concat({
                name: participantName,
                age: Number(participantAge),
            })
        );
        setParticipantName("");
        setParticipantAge(0);
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                Name:
                <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
            <div>
                Animators:
                <input
                    value={animator}
                    onChange={({ target }) => setAnimator(target.value)}
                />
                <button onClick={addAnimator} type="button">
                    Add Animator
                </button>
            </div>
            <div>
                Participants:
                <input
                    value={participantName}
                    onChange={({ target }) => setParticipantName(target.value)}
                />
                <input
                    type="number"
                    value={participantAge}
                    onChange={({ target }) => setParticipantAge(target.value)}
                />
                <button onClick={addParticipant} type="button">
                    Add Participant
                </button>
            </div>
            <div>
                <h3>Animators</h3>
                {animators.map((a, i) => (
                    <p key={i}>{a.name}</p>
                ))}
            </div>
            <div>
                <h3>Participants</h3>
                {participants.map((p, i) => (
                    <p key={i}>
                        {p.name} - {p.age}
                    </p>
                ))}
            </div>
            <button type="submit">Add Group</button>
        </form>
    );
};

export default AddGroup;
