import * as React from "react";
import { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { Chessground } from "@lichess-org/chessground";
import { Config } from "@lichess-org/chessground/config";
import type * as cg from "@lichess-org/chessground/types";
import { Chess, Move, Square } from "chess.js";
import "@lichess-org/chessground/assets/chessground.base.css";
import "@lichess-org/chessground/assets/chessground.brown.css";
import "@lichess-org/chessground/assets/chessground.cburnett.css";

type BoardMode = "PLAY" | "ANALYSIS" | "BOARDEDIT";

interface ChessboardProps {
  mode?: BoardMode;
}

const Chessboard = forwardRef<
  {
    getFen: () => string;
    setFen: (fen: string) => void;
    reset: () => void;
    move: (from: string, to: string) => Move | null;
    getMoves: () => Move[];
  },
  ChessboardProps
>(({ mode = "PLAY" }, ref) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [lastMove, setLastMove] = useState<cg.Key[] | undefined>();
  const cgInstance = useRef<ReturnType<typeof Chessground> | null>(null);

  useImperativeHandle(ref, () => ({
    getFen: () => fen,
    setFen: (newFen: string) => {
      chess.load(newFen);
      setFen(newFen);
      cgInstance.current?.set({ fen: newFen });
    },
    reset: () => {
      chess.reset();
      setFen(chess.fen());
      cgInstance.current?.set({ fen: chess.fen() });
    },
    move: (from: string, to: string) => {
      const move = chess.move({ from, to });
      if (move) {
        setFen(chess.fen());
        setLastMove([from as cg.Key, to as cg.Key]);
        cgInstance.current?.set({ fen: chess.fen(), lastMove: [from as cg.Key, to as cg.Key] });
      }
      return move;
    },
    getMoves: () => chess.moves({ verbose: true }),
  }), [fen, chess]);

  useEffect(() => {
    if (!boardRef.current) return;

    const getAllSquares = (): cg.Key[] => [
      "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1",
      "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
      "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
      "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
      "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
      "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
      "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
      "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"
    ] as cg.Key[];

    const calculateValidMoves = () => {
      const dests = new Map<cg.Key, cg.Key[]>();
      const squares = getAllSquares();
      
      squares.forEach((square) => {
        const moves = chess.moves({ square: square as Square, verbose: true });
        if (moves.length) {
          dests.set(square, moves.map((move) => move.to as cg.Key));
        }
      });
      
      return dests;
    };

    const getMovableConfig = () => {
      switch (mode) {
        case "PLAY":
          return {
            free: false,
            dests: calculateValidMoves(),
            color: chess.turn() === "w" ? "white" : "black" as cg.Color,
          };
        case "ANALYSIS":
          return {
            free: false,
            dests: calculateValidMoves(),
            color: "both" as const,
          };
        case "BOARDEDIT":
          return {
            free: true,
          };
        default:
          return undefined;
      }
    };

    const handleMove = (from: cg.Key, to: cg.Key) => {
      if (mode === "PLAY" || mode === "ANALYSIS") {
        const move = chess.move({ from, to });
        if (move) {
          setFen(chess.fen());
          setLastMove([from, to]);
          cgInstance.current?.set({ fen: chess.fen(), lastMove: [from, to] });
        }
      } else if (mode === "BOARDEDIT") {
        cgInstance.current?.set({ fen, lastMove: [from, to] });
      }
    };

    const options: Config = {
      fen,
      orientation: "white",
      coordinates: true,
      movable: getMovableConfig(),
      lastMove,
      events: {
        move: handleMove,
      },
    };

    cgInstance.current = Chessground(boardRef.current, options);

    return () => {
      cgInstance.current?.destroy?.();
    };
  }, [mode, fen, lastMove, chess]);

  useEffect(() => {
    cgInstance.current?.set({ fen, lastMove });
  }, [fen, lastMove]);

  return (
    <div 
      ref={boardRef} 
      style={{ 
        width: 400, 
        height: 400, 
        border: "3px solid red", 
        boxSizing: "border-box" 
      }} 
    />
  );
});

Chessboard.displayName = "Chessboard";

export default Chessboard;
