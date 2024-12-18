<?php

namespace App\Http\Controllers;

use App\Models\DichVu;
use App\Models\Phong;
use Illuminate\Http\Request;

class DichVuController extends Controller
{
    /**
     * Lấy tất cả thông tin từ bảng dịch vụ.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Lấy tất cả thông tin từ bảng 'dich_vu'
        $dichVu = DichVu::all();

        // Trả về dữ liệu dưới dạng JSON
        return response()->json($dichVu);
    }

    /**
     * Thêm dịch vụ mới.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'Ten_dich_vu' => 'required|string|max:255',
                'Gia' => 'required|numeric|min:0',
                'Don_vi' => 'required|string|max:50',
                'Loai_dich_vu' => 'required|string|max:50',
            ]);

            // Tạo dịch vụ mới
            $dichVu = DichVu::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Thêm dịch vụ thành công.',
                'data' => $dichVu,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi thêm dịch vụ: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cập nhật dịch vụ.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            // Tìm dịch vụ theo ID
            $dichVu = DichVu::find($id);

            if (!$dichVu) {
                return response()->json([
                    'success' => false,
                    'message' => 'Dịch vụ không tồn tại.',
                ], 404);
            }

            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'Ten_dich_vu' => 'nullable|string|max:255',
                'Gia' => 'nullable|numeric|min:0',
                'Don_vi' => 'nullable|string|max:50',
                'Loai_dich_vu' => 'nullable|string|max:50',
            ]);

            // Cập nhật thông tin dịch vụ
            $dichVu->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật dịch vụ thành công.',
                'data' => $dichVu,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi cập nhật dịch vụ: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Xóa dịch vụ theo ID.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            // Tìm dịch vụ theo ID
            $dichVu = DichVu::find($id);

            // Kiểm tra nếu dịch vụ không tồn tại
            if (!$dichVu) {
                return response()->json([
                    'success' => false,
                    'message' => 'Dịch vụ không tồn tại.',
                ], 404);
            }

            // Xóa dịch vụ
            $dichVu->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa dịch vụ thành công.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi xóa dịch vụ: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Lấy chỉ số dịch vụ theo phòng ID.
     *
     * @param int $roomId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getServiceIndexes($phongId)
    {
        try {
            // Tìm phòng theo ID và load dịch vụ thông qua bảng trung gian
            $phong = Phong::with(['dichVus' => function ($query) {
                $query->select('dich_vu.*', 'phong_dich_vu.chi_so', 'phong_dich_vu.ngay_ghi_nhan');
            }])->find($phongId);

            if (!$phong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Phòng không tồn tại.'
                ], 404);
            }

            // Trả về danh sách chỉ số dịch vụ của phòng
            return response()->json([
                'success' => true,
                'data' => $phong->dichVus,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy chỉ số dịch vụ: ' . $e->getMessage(),
            ], 500);
        }
    }

}
