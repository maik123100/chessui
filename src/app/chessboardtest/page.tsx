"use client";

import React, { useState, useRef } from "react";
import Chessboard from "@/components/Chessboard";
import { Move } from "chess.js";

export default function ChessboardTest() {
		const [mode, setMode] = useState<"PLAY" | "ANALYSIS" | "BOARDEDIT">("PLAY");
		const boardRef = useRef<{
		getFen: () => string;
		setFen: (fen: string) => void;
		reset: () => void;
		move: (from: string, to: string) => Move | null;
		getMoves: () => Move[];
	} | null>(null);
		const [moveFrom, setMoveFrom] = useState("");
		const [moveTo, setMoveTo] = useState("");
		const [fen, setFenState] = useState("");
		const [moves, setMoves] = useState<Move[]>([]);

		const handleGetFen = () => {
			if (boardRef.current) setFenState(boardRef.current.getFen());
		};
		const handleSetFen = () => {
			if (boardRef.current && fen) boardRef.current.setFen(fen);
		};
		const handleReset = () => {
			if (boardRef.current) boardRef.current.reset();
		};
		const handleMove = () => {
			if (boardRef.current && moveFrom && moveTo) boardRef.current.move(moveFrom, moveTo);
		};
		const handleGetMoves = () => {
			if (boardRef.current) setMoves(boardRef.current.getMoves());
		};

		return (
			<main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
				<h1 style={{ marginBottom: 24, fontSize: 32 }}>Chessboard Component Test</h1>
				<div style={{ marginBottom: 16, display: "flex", gap: 12 }}>
					<button
						onClick={() => setMode("PLAY")}
						style={{
							padding: "8px 20px",
							borderRadius: 6,
							border: mode === "PLAY" ? "2px solid #007bff" : "1px solid #ccc",
							background: mode === "PLAY" ? "#e3f0ff" : "#fff",
							color: mode === "PLAY" ? "#007bff" : "#333",
							fontWeight: mode === "PLAY" ? "bold" : "normal",
							cursor: "pointer",
							transition: "all 0.2s"
						}}
					>PLAY</button>
					<button
						onClick={() => setMode("ANALYSIS")}
						style={{
							padding: "8px 20px",
							borderRadius: 6,
							border: mode === "ANALYSIS" ? "2px solid #28a745" : "1px solid #ccc",
							background: mode === "ANALYSIS" ? "#eaffea" : "#fff",
							color: mode === "ANALYSIS" ? "#28a745" : "#333",
							fontWeight: mode === "ANALYSIS" ? "bold" : "normal",
							cursor: "pointer",
							transition: "all 0.2s"
						}}
					>ANALYSIS</button>
					<button
						onClick={() => setMode("BOARDEDIT")}
						style={{
							padding: "8px 20px",
							borderRadius: 6,
							border: mode === "BOARDEDIT" ? "2px solid #ff9800" : "1px solid #ccc",
							background: mode === "BOARDEDIT" ? "#fff4e3" : "#fff",
							color: mode === "BOARDEDIT" ? "#ff9800" : "#333",
							fontWeight: mode === "BOARDEDIT" ? "bold" : "normal",
							cursor: "pointer",
							transition: "all 0.2s"
						}}
					>BOARDEDIT</button>
				</div>
				<div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
					<button onClick={handleGetFen}>Get FEN</button>
					<input value={fen} onChange={e => setFenState(e.target.value)} placeholder="Set FEN" style={{ width: 180 }} />
					<button onClick={handleSetFen}>Set FEN</button>
					<button onClick={handleReset}>Reset</button>
				</div>
				<div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
					<input value={moveFrom} onChange={e => setMoveFrom(e.target.value)} placeholder="From (e2)" style={{ width: 80 }} />
					<input value={moveTo} onChange={e => setMoveTo(e.target.value)} placeholder="To (e4)" style={{ width: 80 }} />
					<button onClick={handleMove}>Move</button>
				</div>
				<div style={{ marginBottom: 16 }}>
					<button onClick={handleGetMoves}>Get Moves</button>
					{moves.length > 0 && (
						<pre style={{ maxHeight: 200, overflow: "auto", background: "#f6f6f6", padding: 8, borderRadius: 4 }}>{JSON.stringify(moves, null, 2)}</pre>
					)}
				</div>
				<Chessboard ref={boardRef} mode={mode} />
			</main>
		);
}
