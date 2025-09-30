import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { Chessground } from "@lichess-org/chessground";

// Chessground options type based on official documentation
type ChessgroundOptions = {
  orientation?: "white" | "black";
  turnColor?: "white" | "black";
  check?: string | null;
  lastMove?: [string, string] | null;
  selected?: string | null;
  coordinates?: boolean;
  viewOnly?: boolean;
  minimalDom?: boolean;
  disableContextMenu?: boolean;
  highlight?: {
    lastMove?: boolean;
    check?: boolean;
    dragOver?: boolean;
  };
  animation?: {
    enabled?: boolean;
    duration?: number;
  };
  movable?: {
    free?: boolean;
    color?: "white" | "black" | "both" | null;
    dests?: Record<string, string[]> | null;
    dropOff?: "revert" | "trash";
    showDests?: boolean;
    events?: {
      after?: (orig: string, dest: string, metadata?: any) => void;
    };
  };
  premovable?: {
    enabled?: boolean;
    showDests?: boolean;
    current?: [string, string] | null;
    events?: {
      set?: (orig: string, dest: string) => void;
      unset?: () => void;
    };
  };
  draggable?: {
    enabled?: boolean;
    distance?: number;
    squareTarget?: boolean;
    centerPiece?: boolean;
    showGhost?: boolean;
  };
  drawable?: {
    enabled?: boolean;
  };
  events?: {
    change?: () => void;
    move?: (orig: string, dest: string, capturedPiece?: { color: string; role: string } | null) => void;
    select?: (key: string) => void;
  };
};
import { Chess } from "chess.js";
import "@lichess-org/chessground/assets/chessground.base.css";
import "@lichess-org/chessground/assets/chessground.brown.css";
import "@lichess-org/chessground/assets/chessground.cburnett.css";

type BoardMode = "PLAY" | "ANALYSIS" | "BOARDEDIT";

const Chessboard = forwardRef(({ mode = "PLAY", ...props }: { mode?: BoardMode }, ref) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [lastMove, setLastMove] = useState<string[] | undefined>();
  const cgInstance = useRef<any>(null);

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
        setLastMove([from, to]);
        cgInstance.current?.set({ fen: chess.fen(), lastMove: [from, to] });
      }
      return move;
    },
    getMoves: () => chess.moves({ verbose: true }),
  }), [fen, chess]);

  useEffect(() => {
    if (!boardRef.current) return;
    let movableConfig;
    if (mode === "PLAY") {
      movableConfig = {
        free: false,
        dests: (() => {
          const dests = new Map();
          const squares = [
            "a1","b1","c1","d1","e1","f1","g1","h1",
            "a2","b2","c2","d2","e2","f2","g2","h2",
            "a3","b3","c3","d3","e3","f3","g3","h3",
            "a4","b4","c4","d4","e4","f4","g4","h4",
            "a5","b5","c5","d5","e5","f5","g5","h5",
            "a6","b6","c6","d6","e6","f6","g6","h6",
            "a7","b7","c7","d7","e7","f7","g7","h7",
            "a8","b8","c8","d8","e8","f8","g8","h8"
          ];
          squares.forEach((s: string) => {
            const ms = chess.moves({ square: s as any, verbose: true });
            if (ms.length) dests.set(s, ms.map((m: any) => m.to));
          });
          return dests;
        })(),
  color: chess.turn() === "w" ? "white" : "black" as "white" | "black",
      };
    } else if (mode === "ANALYSIS") {
      movableConfig = {
        free: false,
        dests: (() => {
          const dests = new Map();
          const squares = [
            "a1","b1","c1","d1","e1","f1","g1","h1",
            "a2","b2","c2","d2","e2","f2","g2","h2",
            "a3","b3","c3","d3","e3","f3","g3","h3",
            "a4","b4","c4","d4","e4","f4","g4","h4",
            "a5","b5","c5","d5","e5","f5","g5","h5",
            "a6","b6","c6","d6","e6","f6","g6","h6",
            "a7","b7","c7","d7","e7","f7","g7","h7",
            "a8","b8","c8","d8","e8","f8","g8","h8"
          ];
          squares.forEach((s: string) => {
            const ms = chess.moves({ square: s as any, verbose: true });
            if (ms.length) dests.set(s, ms.map((m: any) => m.to));
          });
          return dests;
        })(),
  color: "both" as "both",
      };
    } else if (mode === "BOARDEDIT") {
      movableConfig = {
        free: true,
      };
    }
    const options: ChessgroundOptions = {
      fen,
      orientation: "white",
      coordinates: true,
      movable: movableConfig,
      lastMove: lastMove as any,
      events: {
        move: (from: string, to: string, capturedPiece?: { color: string; role: string } | null) => {
          if (mode === "PLAY") {
            const move = chess.move({ from, to });
            if (move) {
              setFen(chess.fen());
              setLastMove([from, to]);
              cgInstance.current?.set({ fen: chess.fen(), lastMove: [from, to] });
            }
          } else if (mode === "ANALYSIS") {
            let move = chess.move({ from, to });
            if (move) {
              setFen(chess.fen());
              setLastMove([from, to]);
              cgInstance.current?.set({ fen: chess.fen(), lastMove: [from, to] });
            }
          } else if (mode === "BOARDEDIT") {
            cgInstance.current?.set({ fen, lastMove: [from, to] });
          }
        },
      },
    };
    cgInstance.current = Chessground(boardRef.current, options);
    return () => {
      cgInstance.current?.destroy?.();
    };
  }, [mode]);

  useEffect(() => {
    cgInstance.current?.set({ fen, lastMove });
  }, [fen, lastMove]);

  return <div ref={boardRef} style={{ width: 400, height: 400, border: "3px solid red", boxSizing: "border-box" }} />;
});

export default Chessboard;
