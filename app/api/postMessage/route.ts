import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/src/hook/firebase";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const docRef = await addDoc(collection(db, "messages"), {
      message,
      timestamp: serverTimestamp(),
    });

    return NextResponse.json({ success: true, id: docRef.id }, { status: 200 });
  } catch (error) {
    console.error("Error adding document: ", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { message: "Method GET not allowed" },
    { status: 405 }
  );
}
