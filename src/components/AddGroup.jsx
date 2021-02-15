import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BsFillPlusSquareFill as Plus } from "react-icons/bs";

import { ADD_GROUP, ALL_GROUPS } from "../queries";
import Header from "./styled/Header";
import Subheader from "./styled/Subheader";
import Button from "./styled/Button";
import ButtonWrapper from "./styled/ButtonWrapper";

const Form = styled.form`
    min-width: 30vw;
`;

const PaddedButtonWrapper = styled(ButtonWrapper)`
    margin-top: 1.5em;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const Input = styled.input`
    margin: 1em;
    height: 2em;
    align-self: center;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 5px;
`;

const Select = styled.select`
    margin: 1em;
    height: 2em;
    align-self: center;
    // font-size: 16px;
    border: 2px;
`;

const Label = styled.label`
    font-family: Helvetica;
    font-size: 15px;
`;

const Para = styled.p`
    font-family: Helvetica;
    font-size: 15px;
`;

const AddGroup = () => {
    const [name, setName] = useState("");
    const [participantName, setParticipantName] = useState("");
    const [participantAge, setParticipantAge] = useState(10);
    const [participants, setParticipants] = useState([]);
    const [animator, setAnimator] = useState("");
    const [animators, setAnimators] = useState([]);
    const [showAnimInput, setShowAnimInput] = useState(false);
    const [showPartInput, setShowPartInput] = useState(false);
    const history = useHistory();

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
        } catch (e) {
            console.error(e);
        }

        setName("");
        setParticipantName("");
        setParticipantAge(0);
        setParticipants([]);
        setAnimator("");
        setAnimators([]);
        history.push("/");
    };

    const addAnimator = () => {
        setAnimators(
            animators.concat({
                name: animator,
                conversations: [],
            })
        );
        setAnimator("");
        setShowAnimInput(false);
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
        setShowPartInput(false);
    };

    return (
        <div>
            <Header>Add Group</Header>
            <Form onSubmit={onSubmit}>
                <Wrapper>
                    <Subheader style={{ alignSelf: "center" }}>Name:</Subheader>
                    <Input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </Wrapper>
                <div>
                    <Subheader>Animators</Subheader>
                    {animators.map((a, i) => (
                        <Para key={i}>{a.name}</Para>
                    ))}
                    {showAnimInput ? (
                        <div>
                            <Input
                                value={animator}
                                onChange={({ target }) =>
                                    setAnimator(target.value)
                                }
                            />
                            <Plus onClick={addAnimator} size="0.8em">
                                Add Animator
                            </Plus>
                        </div>
                    ) : (
                        <ButtonWrapper>
                            <Plus
                                color="#0e65f0"
                                size="1.2em"
                                onClick={() => setShowAnimInput(true)}
                            />
                        </ButtonWrapper>
                    )}
                </div>
                <div>
                    <Subheader>Participants</Subheader>
                    {participants.map((p, i) => (
                        <Para key={i}>
                            {p.name} - {p.age}
                        </Para>
                    ))}
                    {showPartInput ? (
                        <div>
                            <Label>Name:</Label>
                            <Input
                                value={participantName}
                                onChange={({ target }) =>
                                    setParticipantName(target.value)
                                }
                            />
                            <Label>Age:</Label>
                            <Select
                                value={participantAge}
                                onChange={({ target }) =>
                                    setParticipantAge(target.value)
                                }
                            >
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                            </Select>
                            <Plus onClick={addParticipant} size="0.8em">
                                Add Participant
                            </Plus>
                        </div>
                    ) : (
                        <ButtonWrapper>
                            <Plus
                                color="#0e65f0"
                                size="1.2em"
                                onClick={() => setShowPartInput(true)}
                            />
                        </ButtonWrapper>
                    )}
                </div>
                <PaddedButtonWrapper>
                    <Button type="submit">Add Group</Button>
                </PaddedButtonWrapper>
            </Form>
        </div>
    );
};

export default AddGroup;
