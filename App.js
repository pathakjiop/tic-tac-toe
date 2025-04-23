import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCombo, setWinningCombo] = useState([]);

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (newBoard) => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinningCombo(combo);
        return newBoard[a];
      }
    }
    if (newBoard.every(cell => cell)) {
      return 'Draw';
    }
    return null;
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      setTimeout(() => {
        Alert.alert(
          result === 'Draw' ? "It's a Draw!" : `🎉 Player ${result} Wins!`,
          '',
          [{ text: 'Play Again', onPress: resetGame }]
        );
      }, 200);
    }
  }, [board]);

  const handlePress = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xTurn ? 'X' : 'O';
    setBoard(newBoard);
    setXTurn(!xTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
    setWinner(null);
    setWinningCombo([]);
  };

  const renderBox = (index) => {
    const isWinningCell = winningCombo.includes(index);
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.box,
          isWinningCell && styles.winningBox,
        ]}
        onPress={() => handlePress(index)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.mark,
          { color: board[index] === 'X' ? '#e11d48' : '#2563eb' }
        ]}>
          {board[index]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>
        {winner ? 'Game Over' : `Turn: Player ${xTurn ? 'X' : 'O'}`}
      </Text>

      <View style={styles.board}>
        {board.map((_, i) => renderBox(i))}
      </View>

      <TouchableOpacity style={styles.resetBtn} onPress={resetGame}>
        <Text style={styles.resetText}>🔄 Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  turnText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 20,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#94a3b8',
  },
  box: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  winningBox: {
    backgroundColor: '#facc15',
  },
  mark: {
    fontSize: 48,
    fontWeight: '800',
  },
  resetBtn: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  resetText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default App;