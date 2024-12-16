<?php

namespace App\Http\Controllers;

use App\Models\PhongDichVu;
use Illuminate\Http\Request;

class PhongDichVuController extends Controller
{
    public function index()
    {
        $data = PhongDichVu::with(['phong', 'dichVu'])->get();

        return response()->json($data);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'phong_id' => 'required|exists:phong,ID_Phong',
            'dich_vu_id' => 'required|exists:dich_vu,ID_DichVu',
            'chi_so' => 'nullable|integer|min:0',
            'ngay_ghi_nhan' => 'nullable|date',
        ]);

        $phongDichVu = PhongDichVu::create($validatedData);

        return response()->json(['success' => true, 'data' => $phongDichVu]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'chi_so' => 'nullable|integer|min:0',
            'ngay_ghi_nhan' => 'nullable|date',
        ]);

        $phongDichVu = PhongDichVu::findOrFail($id);
        $phongDichVu->update($validatedData);

        return response()->json(['success' => true, 'data' => $phongDichVu]);
    }

    public function delete($id)
    {
        $phongDichVu = PhongDichVu::findOrFail($id);
        $phongDichVu->delete();

        return response()->json(['success' => true, 'message' => 'Xóa thành công']);
    }
}
