import { BinService } from "../services/bin.service";

export async function GetBinByIdUseCase(binId) {
  const id = parseInt(binId, 10);
  if (!Number.isInteger(id)) throw { status: 400, message: "Invalid bin ID" };

  const bin = await BinService.getById(id);
  if (!bin) throw { status: 404, message: "Bin not found" };
  
  return bin;
}
