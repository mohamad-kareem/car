import { connectDB } from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const submissions = await ContactSubmission.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch contact submissions" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Submission ID is required" },
        { status: 400 }
      );
    }

    const deletedSubmission = await ContactSubmission.findByIdAndDelete(id);

    if (!deletedSubmission) {
      return NextResponse.json(
        { success: false, message: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Submission deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting contact submission:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete contact submission" },
      { status: 500 }
    );
  }
}
