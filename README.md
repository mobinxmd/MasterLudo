# MasterLudo

A modern, fully-featured Ludo board game built with React.

# Overview
MasterLudo displays an interactive Ludo board with animated pawn pieces that move across the board. It features:

- A gameboard grid with 4 racing tracks (red, green, yellow, blue)
- Pawn pieces for each player that can be moved based on dice rolls
- Rules enforcement (movement paths, safe zones, etc)
- Animations and visual effects for gameplay interactions
- The game board is rendered via the GameBoard component which handles the - game state and logic. The pawn animations and locations are managed - through the state and lifecycle hooks.

Styling is handled through global variables in index.css and component-specific CSS Modules.

# Implementation Details
Components

- GameBoard - Main component with game logic and board rendering
- Pawn - Individual pawn piece with color/position props
- CenterBox - Renders the central triangle dice box

# State Management

useReducer - For global state management tracking game data (dice rolls, pawn positions, etc)
useRef - For DOM node references
