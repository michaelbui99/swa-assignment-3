import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  Center,
} from "@chakra-ui/react";
import { gethighScores } from "../app/features/scoreSlice";

const ScorePage: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.value);
  const currenScore = useSelector((state: RootState) => state.score.value);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      dispatch(
        gethighScores({ id: currentUser.id, token: currentUser.token! })
      );
    }
  }, [currentUser]);

  return (
    <>
      <Box>
          <Center>
            <Heading as="h1" size="4xl">
              High Score
            </Heading>
        </Center>
      </Box>
      <br />
      <Box>
        <Flex>
          <Box>
            <Heading as="h2" size="1xl">
              Top 10 scores
            </Heading>
            <TableContainer>
              <Table size="lg">
                <Thead>
                  <Tr>
                    <Th>Player</Th>
                    <Th>Game</Th>
                    <Th>Score</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currenScore.top10Score.map((score) => (
                    <Tr>
                      <Td>{score.userId}</Td>
                      <Td>{score.gameId}</Td>
                      <Td>{score.score}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Spacer />
          <Box>
            <Heading as="h2" size="1xl">
              My top score
            </Heading>
            <TableContainer>
              <Table size="lg">
                <Thead>
                  <Tr>
                    <Th>Game</Th>
                    <Th>Score</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currenScore.userScore.map((score) => (
                    <Tr>
                      <Td>{score.gameId}</Td>
                      <Td>{score.score}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default ScorePage;
