<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Phong;

class PhongController extends Controller
{
    /**
     * Lấy danh sách các phòng.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Lấy tất cả thông tin từ bảng 'phong'
        $phongs = Phong::all();

        // Trả về dữ liệu dưới dạng JSON
        return response()->json($phongs);
    }

    /**
     * Lấy thông tin phòng kèm các bảng phụ liên quan.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDetailedInfo()
    {
        try {
            // Lấy thông tin phòng kèm theo các quan hệ liên kết
            $phongs = Phong::with(['loaiPhong', 'hopDongs', 'hoaDons', 'dichVus'])->get();

            // Tính toán và định dạng dữ liệu nếu cần
            $data = $phongs->map(function ($phong) {
                return [
                    'ID_Phong' => $phong->ID_Phong,
                    'So_phong' => $phong->So_phong,
                    'Loai_phong' => $phong->loaiPhong->Ten_LoaiPhong ?? null,
                    'Tien_phong' => $phong->hoaDons->sum('TongCong'),
                    'Dich_vu' => $phong->dichVus->map(function ($dichVu) {
                        return [
                            'Ten_dich_vu' => $dichVu->Ten_dich_vu,
                            'Gia' => $dichVu->Gia,
                        ];
                    }),
                    'Tong_cong' => $phong->hoaDons->sum('TongCong') + $phong->dichVus->sum('Gia'),
                ];
            });

            // Trả về dữ liệu dưới dạng JSON
            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy thông tin chi tiết phòng: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cập nhật thông tin phòng.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request, $id)
    {
        try {
            // Tìm phòng theo ID
            $phong = Phong::find($id);

            if (!$phong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Phòng không tồn tại.',
                ], 404);
            }

            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'So_phong' => 'nullable|integer|unique:phong,So_phong,' . $id . ',ID_Phong',
                'Loai_phong_id' => 'nullable|exists:loai_phong,ID_LoaiPhong',
                'Trang_thai' => 'nullable|string|max:50',
                'So_giuong' => 'nullable|integer|min:0',
                'So_tu_lanh' => 'nullable|integer|min:0',
                'So_dieu_hoa' => 'nullable|integer|min:0',
            ]);

            // Cập nhật thông tin phòng
            $phong->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật phòng thành công.',
                'data' => $phong,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi cập nhật phòng: ' . $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Xóa phòng.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        try {
            // Tìm phòng theo ID
            $phong = Phong::find($id);

            if (!$phong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Phòng không tồn tại.',
                ], 404);
            }

            // Xóa phòng
            $phong->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa phòng thành công.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi xóa phòng: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Tạo mới một phòng.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            // Xác thực dữ liệu
            $validatedData = $request->validate([
                'So_phong' => 'required|integer|unique:phong,So_phong',
                'Loai_phong_id' => 'required|exists:loai_phong,ID_LoaiPhong',
                'Trang_thai' => 'required|string|max:50',
                'So_giuong' => 'required|integer|min:0',
                'So_tu_lanh' => 'required|integer|min:0',
                'So_dieu_hoa' => 'required|integer|min:0',
            ]);

            // Tạo mới phòng
            $phong = Phong::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Tạo phòng mới thành công.',
                'data' => $phong,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi tạo phòng: ' . $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Đặt phòng.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
    */
    public function datPhong(Request $request)
    {
        try {
            // Xác thực dữ liệu đầu vào
            $validatedData = $request->validate([
                'Phong_id' => 'required|exists:phong,ID_Phong',
                'CuDan_id' => 'nullable|exists:cu_dan,ID_CuDan',
                'Ho' => 'nullable|string|max:50',
                'Ten' => 'nullable|string|max:50',
                'Ngay_bat_dau' => 'required|date|after_or_equal:today',
                'Ngay_ket_thuc' => 'required|date|after:Ngay_bat_dau',
            ]);

            // Kiểm tra trạng thái phòng
            $phong = Phong::find($validatedData['Phong_id']);
            if ($phong->Trang_thai !== 'Trống') {
                return response()->json([
                    'success' => false,
                    'message' => 'Phòng đã được đặt hoặc đang sử dụng.',
                ], 400);
            }

            // Xử lý trường hợp tài khoản chưa có CuDan_id
            $taiKhoan = auth('api')->user(); // Lấy thông tin tài khoản đăng nhập
            $cuDan = null;

            if (!$taiKhoan->CuDan_id) {
                // Tạo mới cư dân nếu chưa tồn tại
                $cuDan = \App\Models\CuDan::create([
                    'Ho' => $validatedData['Ho'] ?? 'Chưa rõ',
                    'Ten' => $validatedData['Ten'] ?? 'Chưa rõ',
                    'CMND_CCCD' => '000000000', // Giá trị placeholder
                    'So_dien_thoai' => '0000000000', // Giá trị placeholder
                ]);

                // Cập nhật tài khoản với CuDan_id mới
                $taiKhoan->update(['CuDan_id' => $cuDan->ID_CuDan]);
            } else {
                // Lấy thông tin cư dân hiện có
                $cuDan = \App\Models\CuDan::find($taiKhoan->CuDan_id);
            }

            // Tạo hợp đồng đặt phòng (hoặc ghi lại thông tin đặt phòng trong bảng liên quan)
            $hopDong = \App\Models\HopDong::create([
                'phong_id' => $validatedData['Phong_id'],
                'CuDan_id' => $cuDan->ID_CuDan,
                'Ngay_bat_dau' => $validatedData['Ngay_bat_dau'],
                'Ngay_ket_thuc' => $validatedData['Ngay_ket_thuc'],
                'Hieu_luc' => 1, // Đặt trạng thái hiệu lực là 'đang hiệu lực'
                'Loai_hop_dong' => 'Đặt phòng',
            ]);

            // Cập nhật trạng thái phòng
            $phong->update(['Trang_thai' => 'da_dat']);

            return response()->json([
                'success' => true,
                'message' => 'Đặt phòng thành công.',
                'data' => $hopDong,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi đặt phòng: ' . $e->getMessage(),
            ], 500);
        }
    }



}
