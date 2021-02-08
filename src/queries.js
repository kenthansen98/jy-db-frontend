import { gql } from "@apollo/client";

export const ALL_GROUPS = gql`
    query {
        allGroups {
            id
            name
            participants {
                name
                age
            }
            animators {
                name
                conversations
            }
        }
    }
`;

export const FIND_GROUP = gql`
    query findGroup($id: ID!) {
        findGroup(id: $id) {
            id
            name
            participants {
                name
                age
            }
            animators {
                id
                name
                conversations
            }
        }
    }
`;

export const ADD_GROUP = gql`
    mutation addGroup(
        $name: String!
        $participants: [ParticipantInput]
        $animators: [AnimatorInput!]!
    ) {
        addGroup(
            name: $name
            participants: $participants
            animators: $animators
        ) {
            id
            name
            participants {
                name
                age
            }
            animators {
                name
                conversations
            }
        }
    }
`;
