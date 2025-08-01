import { BinService } from "../services/bin.service";

export async function GetAllBinUseCase(page = 1, limit = 1000000) {
  const skip = (page - 1) * limit;
  const bins = await BinService.getAllPaginated(skip, limit);
  const total = await BinService.countAll();

  return { bins, total };
}
