<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HopDong;

class HopDongController extends Controller
{
    /**
     * Lấy danh sách hợp đồng.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Lấy toàn bộ dữ liệu từ bảng hop_dong cùng các liên kết
        $hopDongs = HopDong::with(['phong', 'cuDan'])->get();

        return response()->json($hopDongs);
    }

    /**
     * Thêm hợp đồng mới.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'phong_id' => 'required|exists:phong,ID_Phong',
                'cu_dan_id' => 'required|exists:cu_dan,ID_CuDan',
                'Loai_hop_dong' => 'required|string|max:255',
                'Ngay_bat_dau' => 'required|date',
                'Ngay_ket_thuc' => 'nullable|date|after:Ngay_bat_dau',
                'Hieu_luc' => 'required|boolean',
            ]);

            // Tạo hợp đồng mới
            $hopDong = HopDong::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Thêm hợp đồng thành công.',
                'data' => $hopDong,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi thêm hợp đồng: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cập nhật hợp đồng.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            // Tìm hợp đồng dựa trên `ID_HopDong`
            $hopDong = HopDong::find($id);

            if (!$hopDong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Hợp đồng không tồn tại.',
                ], 404);
            }

            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'phong_id' => 'nullable|exists:phong,ID_Phong',
                'cu_dan_id' => 'nullable|exists:cu_dan,ID_CuDan',
                'Loai_hop_dong' => 'nullable|string|max:255',
                'Ngay_bat_dau' => 'nullable|date',
                'Ngay_ket_thuc' => 'nullable|date|after:Ngay_bat_dau',
                'Hieu_luc' => 'nullable|boolean',
            ]);

            // Cập nhật hợp đồng
            $hopDong->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật hợp đồng thành công.',
                'data' => $hopDong,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi cập nhật hợp đồng: ' . $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Xóa hợp đồng.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            // Tìm hợp đồng dựa trên `ID_HopDong`
            $hopDong = HopDong::find($id);

            if (!$hopDong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Hợp đồng không tồn tại.',
                ], 404);
            }

            // Xóa hợp đồng
            $hopDong->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa hợp đồng thành công.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi xóa hợp đồng: ' . $e->getMessage(),
            ], 500);
        }
    }

}
