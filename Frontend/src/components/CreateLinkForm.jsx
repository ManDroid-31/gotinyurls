import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar22 } from "@/components/Calendar";
import { useCreateLink } from "@/hooks/useCreateLink";
import { CheckCheck, Copy, QrCode } from "lucide-react";
import toast from "react-hot-toast";
import QRPopup from "./QRPopup";

const inputClass =
  "bg-[#303130] !border-none !ring-0 !outline-none shadow-none text-white placeholder:text-gray-300";

const CreateLinkForm = () => {
  const { createLink, loading } = useCreateLink();

  const [formData, setFormData] = useState({
    destination: "",
    title: "",
    custom: "",
    password: "",
    confirmPassword: "",
    enablePassword: false,
    enableQr: false,
  });

  const [expiryDate, setExpiryDate] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [shortened, setShortened] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);
  const [qrPopupOpen, setQrPopupOpen] = useState(false);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildPayload = () => {
    const payload = {
      originalUrl: formData.destination.trim(),
      email: localStorage.getItem("email"),
      title: formData.title?.trim() || null,
      alias: formData.custom?.trim() || null,
      expiry: expiryDate != null ? expiryDate.toISOString() : null,
      enableQr: formData.enableQr,
      enablePassword: formData.enablePassword,
    };

    if (formData.destination == "") {
      toast.error("Original URL is required");
      return null;
    }
    if (!expiryDate || Date.now() >= expiryDate) {
      toast.error("Expiry date must be valid");
      return null;
    }

    if (formData.enablePassword) {
      if (!formData.password) {
        toast.error("Password is required");
        return null;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return null;
      }
      payload.password = formData.password;
    }
    setQrCode(payload.enableQr);
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = buildPayload();
    if (!payload) return;

    try {
      const res = await createLink(payload);
      setShortened(res.shortUrl);

      if (res.qrCode) {
        setQrUrl(res.qrCode);
      }

      setFormData({
        destination: "",
        title: "",
        custom: "",
        expiry: null,
        enableQr: false,
        enablePassword: false,
        password: "",
        confirmPassword: "",
      });
      setExpiryDate(null);

      toast.success("Link created successfully!");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        console.error("Error creating link:", err.message);
        toast.error("Failed to create link", err.message);
      }
    }
  };

  return (
    <div className="flex flex-col rounded-lg gap-5">
      <h3 className="text-2xl lg:text-3xl text-[#dbdbda] font-medium">
        Create Link
      </h3>

      <Card className="bg-[#1b1b1b] border-none text-white max-w-xl md:min-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <CardContent className="space-y-4">
            {/* Destination */}
            {shortened && (
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border border-green-500 p-4 rounded-md bg-[#131320]">
                <div className="flex items-start gap-2 ">
                  <CheckCheck className="h-5 w-5 text-green-400" />
                  <div className="text-[#BBF7D0]">
                    <p>URL shortened successfully!</p>
                    <p className="text-[#93cca7] text-xs sm:text-base">
                      {`${import.meta.env.VITE_BACKEND_URL}/${shortened}`}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between sm:w-fit w-full gap-2">
                  {shortened && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard
                          .writeText(
                            `${import.meta.env.VITE_BACKEND_URL}/${shortened}`
                          )
                          .then(() => {
                            toast.success("Shortened URL copied to clipboard!");
                          });
                      }}
                      className="p-2 rounded-md border border-gray-600 bg-black text-white hover:text-[#BBF7D0]"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  )}
                  {qrCode && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setQrPopupOpen(true);
                      }}
                      className="p-2 rounded-md border border-gray-600 bg-black text-white hover:text-[#BBF7D0]"
                    >
                      <QrCode className="h-5 w-5" />
                    </button>
                  )}

                  {qrPopupOpen && (
                    <QRPopup
                      url={qrUrl}
                      onClose={() => setQrPopupOpen(false)}
                    />
                  )}
                </div>
              </div>
            )}
            <FormField
              label="Destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="http://example.com/my-long-url"
            />

            {/* Title */}
            <FormField
              label="Title"
              optional
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            />

            {/* Custom Alias */}
            <div>
              <Label className="mb-2 text-lg block">
                Custom Alias{" "}
                <span className="text-gray-500 text-sm">- Optional</span>
              </Label>
              <div className="flex gap-3 items-center">
                <Input
                  placeholder="Our Domain"
                  className="bg-[#111111] text-white"
                  disabled
                />
                <span className="text-xl">/</span>
                <Input
                  name="custom"
                  value={formData.custom}
                  onChange={handleChange}
                  placeholder="custom"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Expiry */}
            <div>
              <Label className="mb-2 text-lg block">Expiry</Label>
              <Calendar22 setDate={setExpiryDate} date={expiryDate} />
            </div>

            {/* Password protection */}
            <PasswordSection
              formData={formData}
              setFormData={setFormData}
              inputClass={inputClass}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              handleChange={handleChange}
            />

            {/* QR Code */}
            <SwitchField
              label="QR Code"
              optional
              checked={formData.enableQr}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, enableQr: checked }))
              }
            />
          </CardContent>

          <CardFooter className="flex mt-5 flex-col sm:flex-row justify-between items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              className="text-gray-400  w-full sm:w-auto"
              onClick={() => {
                setFormData({
                  destination: "",
                  title: "",
                  custom: "",
                  expiry: null,
                  enableQr: false,
                  enablePassword: false,
                  password: "",
                  confirmPassword: "",
                });
                setExpiryDate(null);
                setShortened(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              {loading ? "Creating..." : "Shorten My Link →"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

// --- Small Reusable Components ---

const FormField = ({ label, optional, ...props }) => (
  <div>
    <Label className="mb-2 text-lg block">
      {label}{" "}
      {optional && <span className="text-gray-500 text-sm">- Optional</span>}
    </Label>
    <Input className={inputClass} {...props} />
  </div>
);

const SwitchField = ({ label, optional, ...props }) => (
  <div className="flex items-center justify-between">
    <Label className="mb-2 text-lg block">
      {label}{" "}
      {optional && <span className="text-gray-500 text-sm">- Optional</span>}
    </Label>
    <Switch
      className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-black"
      {...props}
    />
  </div>
);

const PasswordSection = ({
  formData,
  setFormData,
  inputClass,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  handleChange,
}) => (
  <div>
    <div className="flex items-center justify-between">
      <Label className="mb-2 text-lg block">
        Password <span className="text-gray-500 text-sm">- Optional</span>
      </Label>
      <Switch
        checked={formData.enablePassword}
        onCheckedChange={(checked) =>
          setFormData((prev) => ({ ...prev, enablePassword: checked }))
        }
        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-black"
      />
    </div>
    {formData.enablePassword && (
      <div className="flex flex-col gap-2">
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          show={showPassword}
          toggle={() => setShowPassword(!showPassword)}
          placeholder="Password"
          className={inputClass}
        />
        <PasswordInput
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          show={showConfirmPassword}
          toggle={() => setShowConfirmPassword(!showConfirmPassword)}
          placeholder="Confirm password"
          className={inputClass}
        />
      </div>
    )}
  </div>
);

const PasswordInput = ({ show, toggle, ...props }) => (
  <div className="flex bg-[#303130] pr-4 rounded-lg">
    <Input type={show ? "text" : "password"} {...props} />
    <button type="button" onClick={toggle}>
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
);

export default CreateLinkForm;
