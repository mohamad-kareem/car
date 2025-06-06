import { connectDB } from "@/lib/mongodb";
import PlateUsage from "@/models/PlateUsage";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const data = await req.json();
    const updatedUsage = await PlateUsage.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return new Response(JSON.stringify(updatedUsage), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
export async function DELETE(_, { params }) {
  try {
    await connectDB();
    await PlateUsage.findByIdAndDelete(params.id);
    return new Response(JSON.stringify({ message: "Deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
