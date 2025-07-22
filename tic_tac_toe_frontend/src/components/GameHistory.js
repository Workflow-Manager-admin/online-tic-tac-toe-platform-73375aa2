import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { games } from '../services/api';

const GameHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await games.getHistory();
        setHistory(response.data);
      } catch (error) {
        console.error('Failed to fetch game history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Game History
      </Typography>
      <Paper>
        <List>
          {history.map((game) => (
            <ListItem key={game.id}>
              <ListItemText
                primary={`Game #${game.id}`}
                secondary={`
                  Player X: ${game.player_x} vs Player O: ${game.player_o}
                  Winner: ${game.state.winner || 'None'}
                  ${game.state.is_draw ? '(Draw)' : ''}
                  ${new Date(game.created_at).toLocaleDateString()}
                `}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default GameHistory;
