import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

const GameBoard = ({ game, onMove, disabled }) => {
  const handleCellClick = (row, col) => {
    if (!disabled && game.state.board[row][col] === null) {
      onMove({ row, col });
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        {game.state.winner 
          ? `Winner: ${game.state.winner}`
          : game.state.is_draw 
          ? "It's a Draw!"
          : `Current Player: ${game.state.current_player}`}
      </Typography>
      <Grid container spacing={1}>
        {game.state.board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <Grid item xs={4} key={`${rowIndex}-${colIndex}`}>
              <Paper
                sx={{
                  height: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: !cell && !disabled ? 'pointer' : 'default',
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: !cell && !disabled ? 'action.hover' : 'background.paper',
                  },
                }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                <Typography variant="h3">
                  {cell || ''}
                </Typography>
              </Paper>
            </Grid>
          ))
        ))}
      </Grid>
    </Box>
  );
};

export default GameBoard;
