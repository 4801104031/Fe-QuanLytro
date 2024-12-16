<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoaiPhong;

class LoaiPhongController extends Controller
{
    /**
     * Lấy danh sách các loại phòng.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Lấy tất cả thông tin từ bảng 'loai_phong'
        $loaiPhongs = LoaiPhong::all();

        // Trả về dữ liệu dưới dạng JSON
        return response()->json($loaiPhongs);
    }

    /**
     * Thêm loại phòng mới.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'Ten_loai_phong' => 'required|string|max:255',
                'Dien_tich' => 'required|numeric|min:0',
                'Gia_thue' => 'required|numeric|min:0',
                'So_giuong_mac_dinh' => 'required|integer|min:0',
                'So_tu_lanh_mac_dinh' => 'required|integer|min:0',
                'So_dieu_hoa_mac_dinh' => 'required|integer|min:0',
            ]);

            // Thêm loại phòng mới
            $loaiPhong = LoaiPhong::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Thêm loại phòng thành công.',
                'data' => $loaiPhong,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi thêm loại phòng: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Chỉnh sửa loại phòng.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            // Tìm loại phòng theo cột khóa chính ID_LoaiPhong
            $loaiPhong = LoaiPhong::where('ID_LoaiPhong', $id)->first();

            if (!$loaiPhong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Loại phòng không tồn tại.',
                ], 404);
            }

            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'Ten_loai_phong' => 'nullable|string|max:255',
                'Dien_tich' => 'nullable|numeric|min:0',
                'Gia_thue' => 'nullable|numeric|min:0',
                'So_giuong_mac_dinh' => 'nullable|integer|min:0',
                'So_tu_lanh_mac_dinh' => 'nullable|integer|min:0',
                'So_dieu_hoa_mac_dinh' => 'nullable|integer|min:0',
            ]);

            // Cập nhật loại phòng
            $loaiPhong->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật loại phòng thành công.',
                'data' => $loaiPhong,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi cập nhật loại phòng: ' . $e->getMessage(),
            ], 500);
        }
    }

}
