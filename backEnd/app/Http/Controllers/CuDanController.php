<?php

namespace App\Http\Controllers;

use App\Models\CuDan;
use Illuminate\Http\Request;

class CuDanController extends Controller
{
    /**
     * Lấy danh sách tất cả cư dân.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Lấy danh sách cư dân với thông tin liên kết phòng
        $cuDans = CuDan::with('phong')->get();

        return response()->json($cuDans, 200);
    }

    /**
     * Thêm mới cư dân.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'Ho' => 'required|string|max:255',
                'Ten' => 'required|string|max:255',
                'Ngay_sinh' => 'required|date',
                'CMND_CCCD' => 'required|string|max:20|unique:cu_dan,CMND_CCCD',
                'So_dien_thoai' => 'required|string|max:15',
                'phong_id' => 'nullable|exists:phong,ID_Phong',
            ]);

            // Tạo mới cư dân
            $cuDan = CuDan::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Thêm cư dân thành công.',
                'data' => $cuDan,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi thêm cư dân: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cập nhật thông tin cư dân.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            // Tìm cư dân theo ID
            $cuDan = CuDan::find($id);

            if (!$cuDan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cư dân không tồn tại.',
                ], 404);
            }

            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'Ho' => 'nullable|string|max:255',
                'Ten' => 'nullable|string|max:255',
                'Ngay_sinh' => 'nullable|date',
                'CMND_CCCD' => 'nullable|string|max:20|unique:cu_dan,CMND_CCCD,' . $id . ',ID_CuDan',
                'So_dien_thoai' => 'nullable|string|max:15',
                'phong_id' => 'nullable|exists:phong,ID_Phong',
            ]);

            // Cập nhật thông tin cư dân
            $cuDan->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật cư dân thành công.',
                'data' => $cuDan,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi cập nhật cư dân: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Xóa cư dân.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            // Tìm cư dân theo ID
            $cuDan = CuDan::find($id);

            if (!$cuDan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cư dân không tồn tại.',
                ], 404);
            }

            // Xóa cư dân
            $cuDan->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa cư dân thành công.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi xóa cư dân: ' . $e->getMessage(),
            ], 500);
        }
    }
}
